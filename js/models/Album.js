function Album(data) {
	_.extend(this, data);
}

Album.prototype.addMusic = function addMusic(music) {
	var musicExists = this.findMusic(music.name);
	if (musicExists) {
		return false;
	} else {
		this.musics.push(music);
		return true;
	}
};

Album.prototype.findMusic = function findMusic(name) {
	var music = _.find(this.musics, function(mus) {
		return mus.name === name;
	});
	return music;
};