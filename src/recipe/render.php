<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
  exit;
}

function fdd_render_block__recipe__page($innerBlocks, $block, $attrs) {
  return "<div class='fdd-recipe--page'>$innerBlocks<div class='fdd-heel'></div></div>";
}

function fdd_render_block__recipe__text($innerBlocks, $block, $attrs) {
  return "<div class='fdd-recipe--text'>$innerBlocks</div>";
}

function fdd_render_block__recipe__media($innerBlocks, $block, $attrs) {
  return "<div class='fdd-recipe--media'>$innerBlocks</div>";
}

function fdd_render_block__recipe__characteristics($innerBlocks, $block, $attrs) {
  $level = $attrs['level'];
  $level_class = strtolower($level);
  $prep_time = $attrs['prep_time'];
  $cook_time = $attrs['cook_time'];
  $portions = $attrs['portions'];

  $content = '';
  $content .= "<div class='fdd-recipe--chars'>";
  $content .= "<div class='fdd-recipe--chars--level $level_class'>$level</div>";
  $content .= "<div class='fdd-recipe--chars--prep_time'>$prep_time</div>";
  $content .= "<div class='fdd-recipe--chars--cook_time'>$cook_time</div>";
  $content .= "<div class='fdd-recipe--chars--portions'>$portions</div>";
  $content .= "</div>";

  return $content;
}
