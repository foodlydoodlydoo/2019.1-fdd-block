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

  $content .= "<div class='fdd-recipe--text' id='recipe_text'>";
  $content .= "<div class='fdd-recipe--excerpt'>$excerpt</div>";
  $content .= "<div class='fdd-recipe--excerpt--after'></div>";
  $content .= $innerBlocks;
  $content .= '[fdd_aweber_form name="subscribe-inline-1" title="(in-content)"]';
  $content .= "</div>";

  return $content;
}

function fdd_render_block__recipe__media($innerBlocks, $block, $attrs) {
  $content .= "<div class='fdd-recipe--media'>";
  $content .= $innerBlocks;
  $content .= "<span class='fdd-recipe--media-nav' id='arrow_left'></span>";
  $content .= "<span class='fdd-recipe--media-nav' id='arrow_right'></span>";
  $content .= "<div class='fdd-heel'></div>";
  $content .= "<a id='recipe_go_to' href='#recipe_text'></a>";
  $content .= "<div class='recipe_go_to--cover'></div>";
  $content .= "<div class='fdd-heel bordered'></div>";
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
