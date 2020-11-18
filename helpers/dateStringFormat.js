module.exports = formatDate = (dateInMs) => {
	const dateStr = new Date(dateInMs)
		.toISOString()
		.split('T')[0]
		.split('-')
		.reverse()
		.join('/');
	const hourStr = new Date(dateInMs)
		.toString()
		.split(' ')
		.slice(4, 5)
		.join(' ');
	return `${dateStr} ${hourStr}`;
	// var d = new Date(date),
	//   month = "" + (d.getMonth() + 1),
	//   day = "" + d.getDate(),
	//   year = d.getFullYear();

	// if (month.length < 2) month = "0" + month;
	// if (day.length < 2) day = "0" + day;

	// return [day, month, year].join("/");
};
