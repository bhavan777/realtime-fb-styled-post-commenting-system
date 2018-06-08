$(document).ready(function () {
  var socket = io();

  var postTemplate = $('#post-template').html();
  var postTemplateScript = Handlebars.compile(postTemplate);

  function renderPosts (data) {
    var isfirstpost = $('#posts .empty-note').length;
    var now = moment();
    var past = moment(data.ts);
    var timeDiff =past.diff(now);
    var timeLabel = moment.duration(timeDiff, "seconds").humanize(true);
    console.log(timeLabel);
    var _html = postTemplateScript({id: data.id, data: data.post, time: timeLabel});
    if (isfirstpost) {
      $('#posts').html(_html);
    } else {
      $('#posts').append(_html);
    }
  }

  function updatePosts (data) {
    var doesExist = $('#' + data.id).length > 0;

    var now = moment();
    var past = moment(data.ts);
    var timeDiff = past.diff(now);
    var timeLabel = moment.duration(timeDiff, "seconds").humanize(true);
    var _html = postTemplateScript({id: data.id, data: data.post, time: timeLabel});

    if (!doesExist) {
      $('#posts').append(_html);
    }
  }

  function initialiseData (data) {
    if (data.length > 0) {
      data.map(function (post) {
        console.log(post);
        updatePosts(post);
      });
    }
  }

  socket.on('init', function (data) {
    initialiseData(data);
  }).on('renderposts', function (data) {
    console.log('data', data);
    renderPosts(data);
  });

  $('#post-form').on('submit', function (e) {
    e.preventDefault();
    var _content = $(this).find('.postform__input').text();
    var time = moment();
    var data = {content:_content, ts:time}
    socket.emit('new post', data); 
  });

  $("#post").on("submit", ".commentform", function (e) {
    e.preventDefault(); 

  })

});
