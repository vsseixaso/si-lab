function Album(data) {
	_.extend(this, data);
}

Album.prototype.addMusic = function addMusic(music) {
	var music = _.find(this.musics, function(mus) {
		return mus.name === music.name;
	});
	if (music) {
		return false;
	} else {
		this.musics.push(music);
		return true;
	}
};