import dateformat from 'dateformat';

export const presets = [
	{
		label: ('Today'),
		value: 'today',
	},
	{
		label: ('Yesterday'),
		value: 'yesterday',
	},
	{
		label: ('Last 7 days'),
		value: 'lastSeven',
	},
	{
		label: ("Last 14 days"),
		value: 'fourteen',
	},
	{
		label: ('Last 30 days'),
		value: 'lastThiry',
	},
	{
		label: ("Last 60 days"),
		value: 'lastSixty',
	},
	{
		label: ('Last 90 days'),
		value: 'lastNinety',
	},
	{
		label: ("Last 180 days"),
		value: 'lastOneEighty',
	},
	{
		label: ('Last year'),
		value: 'lastYear',
	},
] as const;

export function format(date: Date): string {
	return dateformat(SafeDate(date), `yyyy-mm-dd HH:MM:ss`);
}

export function SafeDate(v) {
  return (typeof v === 'string') ? v.replace(/-/g, "/") : v;
}

export function generateFromValue(value: typeof presets[number]["value"]){
	let now = new Date();
	now.setHours(0, 0, 0, 0);
	switch(value){
		case 'today':{
			let _now = dateformat(now, frmt);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: _now,
				endDate: dateformat(end, frmt),
			};
			break;
		}
		case 'yesterday':{
			now.setDate(now.getDate() - 1);
			let _now = dateformat(now, frmt);
			let end = new Date(now)
			end.setHours(23, 59, 59, 0);
			return {
				startDate: _now,
				endDate: dateformat(end, frmt)
			};
			break;
		}
		case  'lastSeven':{
			let start = new Date(now);
			start.setDate(start.getDate() - 6);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			};
			break;
		}
		case  'fourteen':{
			let start = new Date(now);
			start.setDate(start.getDate() - 13);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastThiry':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 29);
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastSixty':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 59)
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastNinety':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 89)
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastOneEighty':{
			let start = new Date(SafeDate(now));
			start.setDate(start.getDate() - 179)
			let end = new Date(now);
			end.setHours(23, 59, 59, 0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			}
			break;
		}
		case  'lastYear':{
			let start = new Date();
			start.setHours(0, 0, 0, 0);
			start.setFullYear(start.getFullYear() - 1);
			start.setMonth(0,1);
			let end = new Date();
			end.setMonth(0,1);
			end.setHours(23, 59, 59, 0);
			end.setDate(0);
			return {
				startDate: dateformat(start, frmt),
				endDate: dateformat(end, frmt),
			};
			break;
		}
	}
}

export function formatRangeDate(startDate, endDate){
	let comareFormat = 'dd mmm, yyyy';
		let start = new Date(SafeDate(startDate)), end = new Date(SafeDate(endDate));
		if(start.getFullYear() === end.getFullYear()){
			comareFormat = 'dd mmm';
			if(start.getMonth() === end.getMonth()){
				comareFormat = "dd";
				if(start.getDate() === end.getDate()){
					comareFormat = "";
				}
			}
		}
	return comareFormat;
}

export const frmt = 'yyyy-mm-dd HH:MM:ss';