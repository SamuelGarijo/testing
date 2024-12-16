import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SORT_TYPES = {
  DATE: "date",
  TITLE: "title",
  ORDER: "order",
};

export default function handler(req, res) {
  try {
    const { sortBy = SORT_TYPES.DATE } = req.query;
    const jobsDirectory = path.join(process.cwd(), "src", "data", "jobs");

    const filenames = fs.readdirSync(jobsDirectory);

    const jobs = filenames
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => {
        const filePath = path.join(jobsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");

        // Use gray-matter to parse the markdown
        const { data: frontmatter, content } = matter(fileContents);
        const id = filename.replace(/\.md$/, "");

        return {
          id,
          frontmatter,
          content,
        };
      })
      .filter((job) => job.frontmatter.publish !== false);

    // Sort based on the specified criteria
    const sortedJobs = jobs.sort((a, b) => {
      switch (sortBy) {
        case SORT_TYPES.DATE:
          return new Date(b.frontmatter.date || 0) - new Date(a.frontmatter.date || 0);

        case SORT_TYPES.ORDER:
          if (a.frontmatter.order && b.frontmatter.order) {
            return a.frontmatter.order - b.frontmatter.order;
          }
          return a.frontmatter.title.localeCompare(b.frontmatter.title);

        case SORT_TYPES.TITLE:
          return a.frontmatter.title.localeCompare(b.frontmatter.title);

        default:
          return new Date(b.frontmatter.date || 0) - new Date(a.frontmatter.date || 0);
      }
    });

    res.status(200).json(sortedJobs);
  } catch (error) {
    console.error("Error loading jobs:", error);
    res.status(500).json({ error: "Failed to load jobs" });
  }
}
