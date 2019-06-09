<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
  exit;
}

function fdd_render_block__recipe__page($innerBlocks, $block, $attrs) {
  $content .= "<div class='fdd-recipe--page'>";
  $content .= $innerBlocks;
  $content .= "<div class='fdd-heel'></div></div>";

  return $content;
}

function fdd_render_block__recipe__text($innerBlocks, $block, $attrs) {
  $excerpt = get_the_excerpt();

  $content .= "<div class='fdd-recipe--text'>";
  $content .= "<div class='fdd-recipe--excerpt'>$excerpt</div>";
  $content .= "<div class='fdd-recipe--excerpt--after'></div>";
  $content .= $innerBlocks;
  $content .= "</div>";

  return $content;
}

function fdd_render_block__recipe__media($innerBlocks, $block, $attrs) {
  $content .= "<div class='fdd-recipe--media'>";
  $content .= $innerBlocks;
  $content .= "</div>";

  return $content;
}

function fdd_render_block__recipe__characteristics($innerBlocks, $block, $attrs) {
  $level = $attrs['level'];
  $level_class = 'fdd-recipe-level-' . strtolower($level);
  $prep_time = $attrs['prep_time'];
  $cook_time = $attrs['cook_time'];
  $portions = $attrs['portions'];

  $content .= "<div class='fdd-recipe--chars'>";
  $content .= "<div class='fdd-recipe--chars--level $level_class'>Level: <span class='value'>$level</span></div>";
  $content .= "<div class='fdd-recipe--chars--prep_time'>Prep Time: <span class='value'>$prep_time</span></div>";
  $content .= "<div class='fdd-recipe--chars--cook_time'>Cook Time: <span class='value'>$cook_time</span></div>";
  $content .= "<div class='fdd-recipe--chars--portions'>Portions: <span class='value'>$portions</span></div>";
  $content .= "</div>";

  return $content;
}
