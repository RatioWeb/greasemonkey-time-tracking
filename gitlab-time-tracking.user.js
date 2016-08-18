// ==UserScript==
// @name        Gitlab time tracking
// @namespace   gitlab_time_tracking
// @description Gitlab time tracking
// @include     http://gitlab.ratioweb.pl/*
// @version     1
// @grant       none
// ==/UserScript==
/**
 * Generate widget code
 */
function createWidget() {
  // Create time tracking widget
  var timetracking = '<div class=\'block timetracking\'>' +
  '<div class=\'title hide-collapsed\'>Time tracking' +
  '<a class="edit-link pull-right" href="#">Edit</a>' +
  '</div>'
  + '<div class="selectbox hide-collapsed">'
  + '<div class="form-group"><div class="control-label">Date</div><div class="col-sm-10"><input placeholder="Date" name="timetrack_date" /></div></div>'
  + '<div class="form-group"><div class="control-label">Hours</div><div class="col-sm-10"><input placeholder="Hours" value="0" type="number" min="0" step="1" name="timetrack_hours" /></div></div>'
  + '<div class="form-group"><div class="control-label">Minutes</div><div class="col-sm-10"><input placeholder="Minutes" value="0" type="number" min="0" max="60" step="15" name="timetrack_minutes" /></div></div>'
  + '<div class="form-group"><div class="control-label">Description</div><div class="col-sm-10"><textarea name="timetrack_description" placeholder="Please enter your activity description here"></textarea></div></div>'
  + '<button name="create_timetrack" value="Create" class="" type="submit">Create</button>'
  + '</div>'
  '</div>';
  $('form.inline-update').append(timetracking);
  $('input[name=timetrack_date]').datepicker({
    dateFormat: 'yy-mm-dd'
  });
  $('button[name=create_timetrack]').click(function () {
    createTimeTrackingComment();
    return false;
  });
}
/**
 * Create tracking comment.
 */

function createTimeTrackingComment() {
  var hours = $('input[name=timetrack_hours]').val();
  var minutes = $('input[name=timetrack_minutes]').val();
  var date = $('input[name=timetrack_date]').val();
  var description = $('textarea[name=timetrack_description]').val();
  var replace = /\|/gi;
  var text = ':clock1:';
  var time_is_entered = (hours + minutes > 0);
  if (!time_is_entered) {
  } 
  else {
    if (hours != 0) {
      text = text + ' ' + hours + 'h';
    }
    if (minutes != 0) {
      text = text + ' ' + minutes + 'm';
    }
    if (date != '') {
      text = text + ' | ' + date + ' ';
    }
    if (description != '') {
      text = text + '| ' + description.replace(replace, '');
    }
    $('textarea[name="note[note]"]').val(text);
    $('textarea[name="note[note]"]').trigger('focus');
    $('textarea[name="note[note]"]').trigger('input');
    $('.btn-create.comment-btn').click();
  }
}


$(function () { createWidget(); });