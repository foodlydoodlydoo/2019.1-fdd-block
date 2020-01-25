<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
  exit;
}

function fdd_render_block__art($innerBlocks, $block, $attrs) {
  $content .= "<div class='fdd-art--page'>";
  $content .= $innerBlocks;
  $content .= '[fdd_aweber_form name="subscribe-inline-1" title="(in-content)"]';
  $content .= "</div>";

  return $content;
}

function fdd_render_block__art__description_container($innerBlocks, $block, $attrs) {
  $content .= "<div class='fdd-art--description'>";
  $content .= "<div class='fdd-art--description-before'></div>";
  $content .= $innerBlocks;
  $content .= "<div class='fdd-art--description-after'></div>";
  $content .= "</div>";

  return $content;
}
