function User(data) {
	_.extend(this, data);

	this.artists = [];
}


User.prototype.addArtist = function addArtist(artist) {
	var artistAlreadyExists = _.find(this.artists, function (art) {
		return art.name === artist.name;
	});	
	if (artistAlreadyExists) {
		return false;
	} else {
		this.artists.push(artist);
		return true;
	}
};