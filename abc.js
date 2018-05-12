var Youtube = require('youtube-video-api')
var youtube = Youtube({ 
  video: {
    part: 'status,snippet' 
  },
  email:'digitaha1993@gmail.com',
  password:'taha1993'
})
 
var params = {
  resource: {
    snippet: {
      title: 'test video',
      description: 'This is a test video uploaded via the YouTube API'
    },
    status: {
      privacyStatus: 'public'
    }
  }
}
 
youtube.authenticate('238853678719-rruvjrtn9b3q1hfp4hge1niitc5k2iok.apps.googleusercontent.com', 'rSvsSUci51fq7CLDyTsTDEvW', function (err, tokens) {
  if (err) return console.error('Cannot authenticate:', err)
  uploadVideo()
})
 
function uploadVideo() {
  youtube.upload('./video.mp4', params, function (err, video) {
    // 'path/to/video.mp4' can be replaced with readable stream. 
    // When passing stream adding mediaType to params is advised.
    if (err) {
      return console.error('Cannot upload video:', err)
    }
 
    console.log('Video was uploaded with ID:', video.id)
  
    // this is just a test! delete it
    youtube.delete(video.id, function (err) {
      if (!err) console.log('Video was deleted')
    })
  })
}
