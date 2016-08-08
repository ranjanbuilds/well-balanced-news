
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
	$.ajax({
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
	.then(function(e) {
		console.log(e);
		podApp.displayWorldy(e);
	});
};

podApp.getHuman = function (query) {
	$.ajax({
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
	.then(function(e) {
		podApp.displayHuman(e);
	});
};

podApp.getLight = function (query) {
	$.ajax({
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
	.then(function(e) {
		podApp.displayLight(e);
	});
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

	$('#startForm').on('submit', function(e) {
		e.preventDefault();

		var namedWorldy = document.getElementsByName('worldy');
		var namedHuman = document.getElementsByName('human');
		var namedLight = document.getElementsByName('light');

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

		podApp.getWorldy(checkedWorldy);
		podApp.getHuman(checkedHuman);
		podApp.getLight(checkedLight);

		// $.when(podApp.getWorldy)
		// 	.done(function(worldy){
		// 		console.log(worldy);
		// 		// console.log(human);
		// 		// console.log(light);
		// 		// podApp.displayWorldy(worldy);
		// 		// podApp.displayHuman(human);
		// 		// podApp.displayLight(light);
		// 	});


		// $('#podcasts').append(`<h2>Podcasts about ${searchTerm}</h2>`)
	}); // start form event listener

	$('.submit-form').on('click', function() {
		$('.please-wait').fadeIn();
		setTimeout(function(){ 
			$('.please-wait p').fadeOut();
			setTimeout(function(){
				$('.please-wait').html(`<a href=#results class="lets-doit">Let's Do It!</a>`);
				$('.lets-doit').on('click', function() {
					$('.please-wait').fadeOut();
				});
			}, 1000)
		}, 4000)
	});

	
}; // init function

$(function() {
	podApp.init();
});



// TO DO: 
// Trends over certain amount of years 
// Only 10 returns at once? Any more? {No, more is possible]
// Search term and return {DONE}
// Display the quote underneath as well 
// Takes the time as a parameter and gives back podcasts that equal that {DONE}
// Drop down options

//requiredObject=audio

//Choose a few human topics: 
//Invisibilia(human behavior), The New Middle(middle class), Hidden Brain(human behavior), YouthRadio (youth's perspective), Social Entrepreneurs:...(social entrepreneurs), storycorps (everyday stories), Race (race), Religion (religion), Humans
//or enter a specific topic
//Choose a few light topics: 
//Strange News, Story of the Day, Food, Pop Culture, Sports, Television, Theater, Animals, Brain Candy
//or enter a specific topic

// Three part sandwich with worldy, human, light given in a chunk of time 10, 20, 30, 40, 50, 60
// Worldy topics are date dependent. Human topics are by relevance. Light topics by relevance. 
// Post the title and the summary and the quote 
// Can refresh on topic if you don't like it 

// 10 minutes: 2-4 minutes each story
// 20 minutes: 5-7 minutes each chunk
// 30 minutes: 10 minutes each chunk 
// 40 minutes: 13 minutes each chunk 
// 50 minutes: 20 minutes, 20 minutes, 10 minutes
// 60 minutes: 20 minutes, 30 minutes, 10 minutes

// call three different times heavy, human, light. Take those results and filter based on duration.