<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
  exit;
}

function fdd_render_block__para_with_title($innerBlocks, $block, $attrs) {
  $content = "";
  $title = $attrs['title'];
  $class_names = 'fdd-titled-para';
  if (array_key_exists('className', $attrs)) {
    $class_names .= ' ' . $attrs['className'];
  }

  $content .= "<div class='$class_names'>";
  $content .= "<h3 class='fdd-titled-para__title'>$title</h3>";
  $content .= "<div class='fdd-titled-para__inner'>$innerBlocks</div>";
  $content .= "</div>";

  return $content;
}

function fdd_render_block__call_to_action_shop($innerBlocks, $block, $attrs) {
  $content = "";
  $content .= fdd_get_shop_cta();

  return $content;
}
