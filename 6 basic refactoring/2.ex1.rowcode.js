// 가장 간단한 경우
{
	function rating(aDriver) {
		return moreThanFiveLateDeliveries(aDriver) ? 2 : 1
	}
	function moreThanFiveLateDeliveries(aDriver) {
		return aDriver.numberOfLateDeliveries > 5
	}
}
{
	function rating(aDriver) {
		return aDriver.numberOfLateDeliveries > 5 ? 2 : 1
	}
}


// 매개변수 일치시키기
{
	function rating(aDriver) {
		return moreThanFiveLateDeliveries(aDriver) ? 2 : 1
	}
	function moreThanFiveLateDeliveries(dvr) { //매개변수만 다름
		return dvr.numberOfLateDeliveries > 5
	}
}
{
	function rating(aDriver) {
		return aDriver.numberOfLateDeliveries > 5 ? 2 : 1
	}
}