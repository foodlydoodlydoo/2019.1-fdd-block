<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
  exit;
}

function fdd_render_block__art($innerBlocks, $block, $attrs) {
  return "<div class='fdd-art--page'>$innerBlocks</div>";
}

function fdd_render_block__art__description_container($innerBlocks, $block, $attrs) {
  $content .= "<div class='fdd-art--description'>";
  $content .= "<div class='fdd-art--description-before'></div>";
  $content .= $innerBlocks;
  $content .= "<div class='fdd-art--description-after'></div>";
  $content .= "</div>";

  return $content;
}
