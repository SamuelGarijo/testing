lv_obj_t * list = lv_obj_create(lv_screen_active());
lv_obj_set_size(list, 200, 200);
lv_obj_center(list);
lv_obj_set_flex_flow(list, LV_FLEX_FLOW_COLUMN);

static lv_style_t style_normal;
lv_style_init(&style_normal);
lv_style_set_bg_color(&style_normal, lv_palette_main(LV_PALETTE_BLUE_GREY));
lv_style_set_radius(&style_normal, 0);

static lv_style_t style_checked;
lv_style_init(&style_checked);
lv_style_set_bg_color(&style_checked, lv_palette_main(LV_PALETTE_ORANGE));

for(int i = 0; i < 10; i++) {
  lv_obj_t * btn = lv_button_create(list);
  lv_obj_set_size(btn, lv_pct(100), LV_SIZE_CONTENT);
  lv_obj_add_flag(btn, LV_OBJ_FLAG_CHECKABLE);
  lv_obj_add_style(btn, &style_normal, LV_STATE_DEFAULT);
  lv_obj_add_style(btn, &style_checked, LV_STATE_CHECKED);
  lv_obj_t * label = lv_label_create(btn);
  lv_label_set_text_fmt(label, "List item %d", i);
}