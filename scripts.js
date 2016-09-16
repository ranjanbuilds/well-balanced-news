
var podApp = {};
podApp.apiKey = 'MDExNjI2NDUzMDEzNzIxOTEwMTgzOTU2NQ001';
podApp.apiUrl = 'http://api.npr.org/query?';
podApp.timeTotal = '';

// radomizes an array, got this from stack overflow http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

podApp.getWorldy = function (query) {
	return $.ajax({
		url: podApp.apiUrl,
		method: 'GET',
		dataType: 'JSON',
		data: {
			apiKey: podApp.apiKey,
			output: 'JSON',
			id: query,
			numResults: '20',
			requiredAssets: 'audio',
			sort: 'relevance',
			action: 'Or'
		}
	})
	// .then(function(e) {
	// 	console.log(e);
	// 	podApp.displayWorldy(e);
	// });
};

podApp.getHuman = function (query) {
	return $.ajax({
		url: podApp.apiUrl,
		method: 'GET',
		dataType: 'JSON',
		data: {
			apiKey: podApp.apiKey,
			output: 'JSON',
			id: query,
			numResults: '20',
			requiredAssets: 'audio',
			sort: 'relevance',
			action: 'Or'
		}
	})
	// .then(function(e) {
	// 	podApp.displayHuman(e);
	// });
};

podApp.getLight = function (query) {
	return $.ajax({
		url: podApp.apiUrl,
		method: 'GET',
		dataType: 'JSON',
		data: {
			apiKey: podApp.apiKey,
			output: 'JSON',
			id: query,
			numResults: '20',
			requiredAssets: 'audio',
			sort: 'relevance',
			action: 'Or'
		}

	})
	// .then(function(e) {
	// 	podApp.displayLight(e);
	// });
};

podApp.displayWorldyRandom = [];

podApp.displayWorldy = function (stories) {
	
	var story = stories.list.story;
	var time = $('input[name=length]:checked').val();
	var timeInSeconds = (time * 60)/3;
	var audioArray = [];

	for (var i = 0; i < story.length; i++) {
		if (story[i].hasOwnProperty('audio')){
			if (story[i].audio[0].format.hasOwnProperty('mp4')) {
				audioArray.push(story[i]);
			} //if ownproperty mp4
		} //if ownproperty audio
	} //for story.length

	var timeTotal = 0;

	shuffle(audioArray);
	podApp.displayWorldyRandom.push(audioArray);

	for (var i = 0; i < audioArray.length; i++) {
		var audioClip = audioArray[i].audio[0].format.mp4.$text;
		// var storyAuthor = audioArray[i].byline[0].name.$text;
		var topicID = audioArray[i].id;
		var storyDate = audioArray[i].storyDate.$text;
		var storySlug = audioArray[i].slug.$text;
		var storyTeaser = audioArray[i].teaser.$text;
		var storyTitle = audioArray[i].title.$text;
		var audioDuration = audioArray[i].audio[0].duration.$text;
		if (timeInSeconds > timeTotal) {
			if (timeInSeconds - timeTotal > audioDuration){
				$('#globalPods').append(`<h3 class='descriptionTitle'>${storyTitle}</h3><p class=description><strong>Date:</strong> ${storyDate}</p><p class='description'><strong>Description:</strong> ${storyTeaser}</p>`).append(`<audio controls><source src="${audioClip}" type="audio/mpeg"></audio>`);
				timeTotal = timeTotal + Number(audioDuration);
			}
		}
	}

	podApp.timeTotal = podApp.timeTotal + timeTotal;
	
	var realTime = function(time) {
		var minutes = Math.floor(time/60);
		var seconds = (time - minutes * 60);
		$('.totalWorldy').html(`${minutes}:${seconds}`);
	}

	realTime(timeTotal);
	totalTime.push(timeTotal);

 
} //display worldy

podApp.displayHuman = function (stories) {
	
	$('choicesHuman').html()
	var story = stories.list.story;
	var time = $('input[name=length]:checked').val();
	var timeInSeconds = (time * 60)/3;
	var audioArray = [];

	for (var i = 0; i < story.length; i++) {
		if (story[i].hasOwnProperty('audio')){
			if (story[i].audio[0].format.hasOwnProperty('mp4')) {
				audioArray.push(story[i]);
			} //if ownproperty mp4
		} //if ownproperty audio
	} //for story.length

	var timeTotal = 0;

	shuffle(audioArray);

	for (var i = 0; i < audioArray.length; i++) {
		var audioClip = audioArray[i].audio[0].format.mp4.$text;
		// var storyAuthor = audioArray[i].byline[0].name.$text;
		var topicID = audioArray[i].id;
		var storyDate = audioArray[i].storyDate.$text;
		var storySlug = audioArray[i].slug.$text;
		var storyTeaser = audioArray[i].teaser.$text;
		var storyTitle = audioArray[i].title.$text;
		var audioDuration = audioArray[i].audio[0].duration.$text;
		if (timeInSeconds > timeTotal) {
			if (timeInSeconds - timeTotal > audioDuration){
				$('#humanPods').append(`<h3 class='descriptionTitle'>${storyTitle}</h3><p class=description><strong>Date:</strong> ${storyDate}</p><p class='description'><strong>Description:</strong> ${storyTeaser}</p>`).append(`<audio controls><source src="${audioClip}" type="audio/mpeg"></audio>`);
				timeTotal = timeTotal + Number(audioDuration);
			}
		}
	}
	
	podApp.timeTotal = podApp.timeTotal + timeTotal;
	
	var realTime = function(time) {
		var minutes = Math.floor(time/60);
		var seconds = (time - minutes * 60);
		$('.totalHuman').html(`${minutes}:${seconds}`);
	}
	realTime(timeTotal);
	totalTime.push(timeTotal);
 
} //display human

podApp.displayLight = function (stories) {
	
	var story = stories.list.story;
	var time = $('input[name=length]:checked').val();
	var timeInSeconds = (time * 60)/3;
	var audioArray = [];

	for (var i = 0; i < story.length; i++) {
		if (story[i].hasOwnProperty('audio')){
			if (story[i].audio[0].format.hasOwnProperty('mp4')) {
				audioArray.push(story[i]);
			} //if ownproperty mp4
		} //if ownproperty audio
	} //for story.length

	var timeTotal = 0;

	shuffle(audioArray);

	for (var i = 0; i < audioArray.length; i++) {
		var audioClip = audioArray[i].audio[0].format.mp4.$text;
		// var storyAuthor = audioArray[i].byline[0].name.$text;
		var topicID = audioArray[i].id;
		var storyDate = audioArray[i].storyDate.$text;
		var storySlug = audioArray[i].slug.$text;
		var storyTeaser = audioArray[i].teaser.$text;
		var storyTitle = audioArray[i].title.$text;
		var audioDuration = audioArray[i].audio[0].duration.$text;
		if (timeInSeconds > timeTotal) {
			if (timeInSeconds - timeTotal > audioDuration){
				$('#lightPods').append(`<h3 class='descriptionTitle'>${storyTitle}</h3><p class=description><strong>Date:</strong> ${storyDate}</p><p class='description'><strong>Description:</strong> ${storyTeaser}</p>`).append(`<audio controls><source src="${audioClip}" type="audio/mpeg"></audio>`);
				timeTotal = timeTotal + Number(audioDuration);
			}
		}
	}
	
	// podApp.timeTotal = podApp.timeTotal + timeTotal;
	
	var realTime = function(time) {
		var minutes = Math.floor(time/60);
		var seconds = (time - minutes * 60);
		$('.totalLight').html(`${minutes}:${seconds}`);
	}
	realTime(timeTotal);
	totalTime.push(timeTotal);
 
} //display light

totalTime = [];


podApp.init = function() {

	$('.intro_next').on('click', function() {
		$('.introduction').hide();
	})

	$('.walk_next').on('click', function() {
		$('.walk').css('z-index', 0)
	})

	$('.global_next').on('click', function() {
		$('.global_topics').css('z-index', -1);
	})

	$('.human_next').on('click', function() {
		$('.human_topics').css('z-index', -2);
	})

	// $('.light_next').on('click', function() {
	// 	$('.light_topics').hide();
	// })


	$('#startForm').on('submit', function(e) {
		e.preventDefault();

		var namedWorldy = document.getElementsByName('worldy');
		var namedHuman = document.getElementsByName('human');
		var namedLight = document.getElementsByName('light');

		console.log(namedWorldy, namedHuman, namedLight);

		var checkedWorldy = '';
		for (var i = 0; i < namedWorldy.length; i++) {
			if (namedWorldy[i].checked) {
				checkedWorldy = checkedWorldy + `${namedWorldy[i].value}`
			};
		}
		var checkedHuman = '';
		for (var i = 0; i < namedHuman.length; i++) {
			if (namedHuman[i].checked) {
				checkedHuman = checkedHuman + `${namedHuman[i].value}`
			};
		}
		var checkedLight = '';
		for (var i = 0; i < namedLight.length; i++) {
			if (namedLight[i].checked) {
				checkedLight = checkedLight + `${namedLight[i].value}`
			};
		}

		$('#globalPods').empty();
		$('#humanPods').empty();
		$('#lightPods').empty();

		checkedWorldy = checkedWorldy.replace(/\s/g, '');
		checkedHuman = checkedHuman.replace(/\s/g, '');
		checkedLight = checkedLight.replace(/\s/g, '');

		// podApp.getWorldy(checkedWorldy);
		// podApp.getHuman(checkedHuman);
		// podApp.getLight(checkedLight);

		$.when(podApp.getWorldy(checkedWorldy), podApp.getHuman(checkedHuman), podApp.getLight(checkedLight)).done(function(world, human, light){
			// console.log(world[0]);
			// console.log(human[0]);
			// console.log(light[0]);
			podApp.displayWorldy(world[0]);
			podApp.displayHuman(human[0]);
			podApp.displayLight(light[0]);

			$('.please-wait p').fadeOut();
			setTimeout(function(){
				$('.please-wait').html(`<a href=#results class="lets-doit">Let's Do It!</a>`);
				$('.lets-doit').on('click', function() {
					$('.please-wait').fadeOut();
				});
			}, 1000)

			$('.podcasts').show();
			// console.log(podApp.timeTotal);
			// var realTime = function(time) {
			// 	var minutes = Math.floor(time/60);
			// 	var seconds = (time - minutes * 60);
			// 	$('.totalTotal').html(`${minutes}:${seconds}`);
			// }
			// realTime(podApp.timeTotal);

		})

	}); // start form event listener

	$('.submit-form').on('click', function() {
		$('.please-wait').fadeIn();
		setTimeout(function(){ 
		}, 4000)
	});

	
}; // init function

$(function() {
	podApp.init();
});
