function Artist(data) {
	_.extend(this, data);

	this.albuns = [];
}

Artist.prototype.addAlbum = function addAlbum(album) {
	if(!_.includes(this.albuns, album)){
		this.albuns.push(album);
	}
};