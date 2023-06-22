'use strict';
// # Date
// built-in object. It stores the date, time and provides methods for date/time management.

// ~ new date creation

// dates in JS use UTC = Universal Time Coordinated - a modern standard by which the world regulates clocks and time

// new Date() can take different kinds of arguments

// = 1. No arguments: current date
{
	const nowDate = new Date();

	console.log(nowDate);
	// the string representation of Date is outputted in local format (local time zone - aware)

	// each time the script is evaluated, we'll get a new date
	// the date will change when you press Ctrl + S
}

// = 2 year, month, date, hours, minutes, seconds, ms
{
	console.log(new Date(2020, 1, 19));
	// ! months are numbered starting from zero!
	// ! no way to specify a time zone
}

// = 3 date string
{
	/* string format: (ISO format )
	  YYYY-MM-DDTHH:mm:ss.sssZ
  year-month-dayThours:minutes:seconds.milliseconds+-hours:minutes
  The optional 'Z' part denotes the time zone in the format +-hh:mm. A single letter Z would mean UTC+0.
  */

	// if the time is not specified, it's assumed to be midnight GMT (Greenwich meridian) and is adjusted according to the time zone the code is run in

	console.log(new Date('2020-01-19'));
	// months are numbered from 1, so to get the date in January we pass 2020-01
	
	console.log(new Date('2020-01-19T13:50'));

	console.log(new Date('2020-01-01T00:00:00.00+01:00'));
	// by setting a time zone, we're telling the JS that the date we refer was measured is to the specific time zone.
	// then JS will make a corresponding adjustment when converting this time to GMT+0000
	// when the date will be outputted, the conversion will be done to the current local zone
	// in this example 00.00 in GMT+1:00 becomes 01:00 in GMT+200

	const now = new Date();
	console.log(now);
	console.log(now.toString());
	console.log(now.toISOString());
}

{
	// because of the 'summer time' differences, string representation of the Date can show different GMT time zomes dependeding of wether we created 'summer' date or 'winter' date
	console.log(new Date(2020, 1, 1)); // winter date
	console.log(new Date(2020, 6, 1)); // summer date
}

// # 4 timestamp
/* timestamp - number of milliseconds, passed from 1.01.1970 UTC+0 (UNIX Epoch) always relative to UTC+0
(timezone-agnostic and uniquely defines an instant in history)

dates before this moment will be negative numbers
it's just a number so it is a 'light-weight' format for date
*/
{
	const nowTimestamp = Date.now();
	console.log(nowTimestamp);

	// if number is passed into Date constructor it is considered a timestamp and a corresponding date is created;
	console.log(new Date(0));

	const HOUR = 60 * 60 * 1000; // number of milliseconds in an hour

	console.log(new Date(HOUR));

	// ~ Ways to create a date as a timestamp
	{
		// = 1. Date.now
		console.log(Date.now());

		// = 2. Date.parse - from date string
		console.log(Date.parse('2012-01-26T13:51:50.417-07:00'));

		// = 3. Date.UTC - from date components
		const timestamp = Date.UTC(2020, 4, 19, 12); // assumes that date components are specified in UTC time
		console.log(timestamp); //
		console.log(new Date(timestamp));

		// = 4. getTime - from existing Date object
		const now = new Date();
		console.log(now.getTime());
	}

	// ~ we can also convert existing Date to timestamp
	{
		const nowDate = new Date();
		console.log(nowDate);

		// = 1 using Date.getTime
		const nowTimestamp = nowDate.getTime(); // faster then doing the Number() transform
		console.log(nowTimestamp);

		// = 2 using Number conversion
		console.log(Number(nowDate)); // slower
		// Number conversion happens automatically when substracting Dates
		console.log(new Date() - new Date(0));

		// but from the point of performance optimization it's better to substract timestamps
		console.log(Date.now() - new Date(0).getTime());

		// calculate how much hours passed from 1.01.1970 UTC+0
		const HOUR = 1000 * 60 * 60;
		console.log((Date.now() - new Date(0).getTime()) / HOUR);
	}
}

// # working with Date components
// ~ getting data components from existing Date
{
	const now = new Date();

	// By default - in accordance with local time zone:
	console.log(now.getFullYear()); // year (mind 'Full' - returns 4 digits)
	console.log(now.getMonth()); // ! month, numbered starting from zero!
	console.log(now.getDate()); // day of month
	console.log(now.getDay()); // ! day of week, also counted starting from zero!

	console.log(now.getHours());
	console.log(now.getMinutes());
	console.log(now.getSeconds());
	console.log(now.getMilliseconds());

	console.log(now.getUTCHours()); // shows time in accordance with UTC+0
	console.log(now.getUTCMinutes());
	// console.log(now.getUTCSeconds());
	// console.log(now.getUTCMilliseconds());
}

// ~ setting the date components
{
	// analogous methods with set... instead of get. There are also UTC - flavours.
	const now = new Date();
	console.log(now);
	console.log(now.getHours());

	console.log(now.setHours(12)); // ! timestamp is returned
	console.log(now);

	console.log(now.getHours());
}

// # Autocorrection
{
	const date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
	console.log(date); // ...1st Feb 2013!

	// you can get such results when doing math with dates, so autocorrection is very handy
	const now = new Date();
	console.log(now.getMinutes());
	console.log(now.getHours());

	// let's add 120 minutes to the date
	now.setMinutes(now.getMinutes() + 120);
	// minutes was automatically translated into hours:
	console.log(now);
	console.log(now.getMinutes());
	console.log(now.getHours());
}
