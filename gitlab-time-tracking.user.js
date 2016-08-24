// ==UserScript==
// @name        Gitlab time tracking
// @namespace   gitlab_time_tracking
// @description Gitlab time tracking
// @include     http://gitlab.ratioweb.pl/*
// @require     http://momentjs.com/downloads/moment-with-locales.min.js
// @version     1.2
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
  + '<div class="form-group"><div class="control-label">Hours so far</div><div class="col-sm-10"><strong>' + aggregateSumOfTrackingComment() +'</strong></div></div>'
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

function aggregateSumOfTrackingComment() {
    var time = moment.duration();
    $('li.note img.emoji[title=":clock1:"]').each (function() {
      var data = $(this).parent().text().split('|').map(function(element) { return $.trim(element); });
      var hours_matched = data[0].match(/(\d+)h/);
      var minutes_matched = data[0].match(/(\d+)m/);
      var days_matched = data[0].match(/(\d+)d/);

      var hours = Array.isArray(hours_matched) ? hours_matched[1] : 0;
      var minutes = Array.isArray(minutes_matched) ? minutes_matched[1] : 0;
      var days = Array.isArray(days_matched) ? days_matched[1] : 0;

      time.add(
        moment.duration({
          'hours': hours,
          'minutes': minutes,
          'days': days
        })
      );

    });


    return time.asHours();
}


$(function () { createWidget(); });
