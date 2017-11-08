function User(data) {
	_.extend(this, data);

	this.artists = [];
	this.albuns = [];
}

User.prototype.addArtist = function addArtist(artist) {
	var artistAlreadyExists = this.findArtist(artist.name);
	if (artistAlreadyExists) {
		return false;
	} else {
		this.artists.push(artist);
		return true;
	}
};

User.prototype.addMusic = function addMusic(music) {
	var album = this.findAlbum(music.album);
	if (album) {
		var wasAdded = album.addMusic(music);
		return wasAdded;
	} else {
		var data = {name: music.album, musics: [music]};
		var newAlbum = new Album(data);
		this.albuns.push(newAlbum);
		
		var artist = this.findArtist(music.artist);
		artist.albuns.push(newAlbum);
	}
};

User.prototype.findArtist = function findArtist(name) {
	var artist = _.find(this.artists, function(art) {
		return art.name === name;
	});
	return artist;
};

User.prototype.findAlbum = function findAlbum(name) {
	var album = _.find(this.albuns, function(alb) {
		return alb.name === name;
	});
	return album;
};

User.prototype.getArtists = function getArtists() {
	return this.artists;
};