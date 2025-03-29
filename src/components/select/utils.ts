export function sanitizeStringForReg(q: string){
  return q.replace(/\\/g, "");
}

export function mapValueToKey(v): string {
	if (v === undefined) {
		return 'undefined';
	} else if (v === null) {
		return 'null';
	} else {
		return v.toString();
	}
}