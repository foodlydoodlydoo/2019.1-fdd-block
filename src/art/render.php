<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
  exit;
}

function fdd_render_block__art($innerBlocks, $block, $attrs) {
  $content .= "<div class='fdd-art--page'>";
  $content .= $innerBlocks;
  $content .= "</div>";

  $content .= file_get_contents(plugins_url('/common/_photoswipe.php', dirname(__FILE__)));

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
