import { useState, useEffect } from "react";

import Link from "next/link";

import { Section, Meta, RichText, Text, Heading, Icon, Button } from "@/components/common";
import { SectionHeader, SectionContent } from "@/components/common/section";

import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from "@/components/common";

import slugify from "slugify";

import styles from "./jobs.module.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [fulfilled, setFulfilled] = useState(false);

  useEffect(() => {
    const fetchSortedJobs = async () => {
      const res = await fetch(`/api/jobs?sortBy=date`);
      const sortedJobs = await res.json();
      setJobs(sortedJobs.filter((job) => job.frontmatter.fulfilled === null));
      setFulfilled(sortedJobs.filter((job) => job.frontmatter.fulfilled === true));
    };

    fetchSortedJobs();
  }, []);

  return (
    <>
      <Meta title="Working at LVGL — LVGL" />
      <Section className={styles.hero}>
        <Heading as="h1" size="h1" color="primary">
          Working at LVGL
        </Heading>
        <Text size="xl" center="true" color="secondary">
          Take a look at our current job openings, and learn more about our core values and how we work.
        </Text>
      </Section>
      <Section id="open-positions" className={styles.jobs}>
        <div className={styles.jobsContent}>
          <header>
            <div className={styles.jobsHeader}>
              <Heading as="h2" size="h2" color="primary" href="#open-positions">
                Current job openings
              </Heading>
              <Text size="lg" color="secondary">
                <Link href="#about">Read more</Link> about our core values and how we work.
              </Text>
            </div>
          </header>
          <Accordion id="job" title="Opening Positions at LVGL">
            {jobs.length === 0 && (
              <div className={styles.fulfilled}>
                <Text size="lg" color="secondary">
                  Although the following roles are currently filled, we’re still eager to connect with exceptional
                  talent. <Link href="#contact">Feel free to reach out</Link> if you’d like to be considered for future
                  opportunities.
                </Text>
              </div>
            )}
            {jobs.length > 0 &&
              jobs.map((job, index) => (
                <AccordionItem
                  id={slugify(job.frontmatter.title).toLowerCase()}
                  key={`open-${index}`}
                  opened={index === 0}>
                  <AccordionHeader>
                    <Heading as="h3" size="h3" color="primary" className={styles.jobTitle}>
                      {job.frontmatter.title}
                    </Heading>
                    {job.frontmatter.location && (
                      <Text size="sm" className={styles.jobMeta}>
                        <strong>Location:</strong> {job.frontmatter.location}
                      </Text>
                    )}
                    {job.frontmatter.salary && (
                      <Text size="sm" className={styles.jobMeta}>
                        <strong>Salary:</strong> {job.frontmatter.salary}
                      </Text>
                    )}
                    {job.frontmatter.employment && (
                      <Text size="sm" className={styles.jobMeta}>
                        <strong>Employment:</strong> {job.frontmatter.employment}
                      </Text>
                    )}
                  </AccordionHeader>
                  <AccordionBody>
                    <RichText type="markdown" size="sm" className={styles.jobDescription}>
                      {job.content}
                    </RichText>
                  </AccordionBody>
                </AccordionItem>
              ))}
            {fulfilled.length > 0 &&
              fulfilled.map((job, index) => (
                <AccordionItem
                  id={slugify(job.frontmatter.title).toLowerCase()}
                  key={`fulfilled-${job.id}`}
                  opened={index === 0}>
                  <AccordionHeader>
                    <Heading as="h3" size="h3" color="primary" className={styles.jobTitle}>
                      {job.frontmatter.title} [Position Filled]
                    </Heading>
                    {job.frontmatter.location && (
                      <Text size="sm" className={styles.jobMeta}>
                        <strong>Location:</strong> {job.frontmatter.location}
                      </Text>
                    )}
                    {job.frontmatter.salary && (
                      <Text size="sm" className={styles.jobMeta}>
                        <strong>Salary:</strong> {job.frontmatter.salary}
                      </Text>
                    )}
                    {job.frontmatter.employment && (
                      <Text size="sm" className={styles.jobMeta}>
                        <strong>Employment:</strong> {job.frontmatter.employment}
                      </Text>
                    )}
                  </AccordionHeader>
                  <AccordionBody>
                    <RichText type="markdown" size="sm" className={styles.jobDescription}>
                      {job.content}
                    </RichText>
                  </AccordionBody>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </Section>
      <Section id="about" fillView={true} data-theme="orange" layout="two-cols" className={styles.about}>
        <SectionHeader>
          <Heading as="h2" size="h2" color="primary" href="#about">
            About LVGL
          </Heading>
        </SectionHeader>
        <SectionContent>
          <Text color="primary">
            LVGL is a fast-growing, innovation-driven company with a mission to make UI development simpler for embedded
            engineers. Our powerful, open-source graphics library helps developers worldwide bring smooth, high-quality
            user interfaces to devices with limited resources. Headquartered in Budapest, our core team works closely
            with our team in Switzerland and collaborates with a global network of hundreds of active contributors,
            whose diverse voices and perspectives help shape LVGL’s direction.
          </Text>
          <Text color="primary">
            Blending all these insights, we transform a range of viewpoints into a unified, powerful tool that supports
            developers worldwide. LVGL is increasingly chosen by global consumer electronics companies, renowned
            semiconductor manufacturers, and key players in embedded systems, further extending our reach and impact.
          </Text>
          <Text color="primary">
            Our vision is to become the industry standard UI solution for embedded graphics, setting the benchmark for
            UI development across industries.
          </Text>
          <Heading as="h3" size="h3" color="primary" href="#core-values">
            Core Values
          </Heading>
          <div className={styles.coreValues}>
            <div className={styles.coreValue}>
              <Icon name="feather" />
              <Heading as="h3" size="h4" color="primary">
                Lightness
              </Heading>
              <Text size="sm" color="secondary">
                We keep our products, processes and relationships easy and light.
              </Text>
            </div>

            <div className={styles.coreValue}>
              <Icon name="door" />
              <Heading as="h3" size="h4" color="primary">
                Openness
              </Heading>
              <Text size="sm" color="secondary">
                We build in the open, work transparently and collaborate well as a result.
              </Text>
            </div>

            <div className={styles.coreValue}>
              <Icon name="steps" />
              <Heading as="h3" size="h4" color="primary">
                Progress
              </Heading>
              <Text size="sm" color="secondary">
                We value small, steady steps over perfection.
              </Text>
            </div>
          </div>
        </SectionContent>
      </Section>
    </>
  );
};

export default Jobs;
