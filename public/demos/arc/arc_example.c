static lv_subject_t value;
lv_subject_init_int(&value, 30);

lv_obj_t * arc = lv_arc_create(lv_screen_active());
lv_obj_set_size(arc, 200, 200);
lv_obj_center(arc);
lv_arc_bind_value(arc, &value);

lv_obj_set_style_arc_opa(arc, LV_OPA_50, LV_PART_MAIN);
lv_obj_set_style_arc_color(arc, lv_color_hex(0xffffff), LV_PART_INDICATOR);
lv_obj_set_style_bg_color(arc, lv_color_hex(0xffffff), LV_PART_KNOB);
lv_obj_set_style_shadow_width(arc, 15, LV_PART_KNOB);
lv_obj_set_style_shadow_opa(arc, LV_OPA_40, LV_PART_KNOB);
lv_obj_set_style_shadow_offset_y(arc, 5, LV_PART_KNOB);

lv_obj_t * label = lv_label_create(arc);
lv_obj_center(label);
lv_label_bind_text(label, &value, "%d °C");
lv_obj_set_style_text_font(label, &lv_font_montserrat_32, 0);