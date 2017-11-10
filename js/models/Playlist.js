function Playlist(data) {
	_.extend(this, data);

	this.musics = [];
}

Playlist.prototype.findMusic = function findMusic(name) {
	var music = _.find(this.musics, function(mus) {
		return mus.name === name;
	});
	return music;
};

Playlist.prototype.removeMusic = function removeMusic(music) {
	_.remove(this.musics, function(mus) {
		return mus.name === music.name;
	});
};