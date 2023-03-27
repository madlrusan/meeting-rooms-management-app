
import { IRoom } from "../models/IRooms";


export 	const roomData: IRoom[] = [
	{ name: "Jammy", roomId: 1, color: "#ea7a57", capacity: 20, type: "Conference", features : [
		"features",
		"features",
		"features",
		"features",
		"features"
	], link: "/scheduler"
},
	{ name: "Tweety", roomId: 2, color: "#7fa900", capacity: 7, type: "Cabin" , features : [
		"features",
		"features",
		"features",
		"features",
		"features"
	],link: "/scheduler"},
	{ name: "Nestle", roomId: 3, color: "#5978ee", capacity: 5, type: "Cabin", features : [
		"features",
		"features",
		"features",
		"features",
		"features"
	],link: "/scheduler" },
	{ name: "Phoenix", roomId: 4, color: "#fec200", capacity: 15, type: "Conference" , features : [
		"features",
		"features",
		"features",
		"features",
		"features"
	],link: "/scheduler"},
	{ name: "Mission", roomId: 5, color: "#df5286", capacity: 25, type: "Conference" , features : [
		"features",
		"features",
		"features",
		"features",
		"features"
	] ,link: "/scheduler"},
	{ name: "Hangout", roomId: 6, color: "#00bdae", capacity: 10, type: "Cabin" , features : [
		"features",
		"features",
		"features",
		"features",
		"features"
	] ,link: "/scheduler"},
	{ name: "Rick Roll", roomId: 7, color: "#865fcf", capacity: 20, type: "Conference", features : [
		"features",
		"features",
		"features",
		"features",
		"features"
	] ,link: "/scheduler"},
	{ name: "Rainbow", roomId: 8, color: "#1aaa55", capacity: 8, type: "Cabin", features : [
		"features",
		"features",
		"features",
		"features",
		"features"
	] ,link: "/scheduler"},
	{ name: "Swarm", roomId: 9, color: "#df5286", capacity: 30, type: "Conference", features : [
		"features",
		"features",
		"features",
		"features",
		"features"
	],link: "/scheduler" },
	{ name: "Photogenic", roomId: 10, color: "#710193", capacity: 25, type: "Conference" , features : [
		"features",
		"features",
		"features",
		"features",
		"features"
	],link: "/scheduler"}
];

export const eventData = [{
	"id": 1,
	"subject": "event 498",
	"startTime": new Date("2023-03-06T08:06:05Z"),
	"endTime": new Date("2023-03-06T09:06:05Z"),
	"roomId": 9
}, {
	"id": 2,
	"subject": "event 289",
	"startTime": new Date("2023-03-07T11:48:55Z"),
	"endTime": new Date("2023-03-07T12:48:55Z"),
	"roomId": 4
}, {
	"id": 3,
	"subject": "event 927",
	"startTime": new Date("2023-02-28T12:47:03Z"),
	"endTime": new Date("2023-02-28T13:47:03Z"),
	"roomId": 6
}, {
	"id": 4,
	"subject": "event 406",
	"startTime": new Date("2023-03-07T23:44:23Z"),
	"endTime": new Date("2023-03-07T00:44:23Z"),
	"roomId": 1
}, {
	"id": 5,
	"subject": "event 096",
	"startTime": new Date("2023-02-28T10:02:49Z"),
	"endTime": new Date("2023-02-28T11:02:49Z"),
	"roomId": 10
}, {
	"id": 6,
	"subject": "event 916",
	"startTime": new Date("2023-03-01T15:31:06Z"),
	"endTime": new Date("2023-03-01T16:31:06Z"),
	"roomId": 5
}, {
	"id": 7,
	"subject": "event 677",
	"startTime": new Date("2023-03-01T09:53:50Z"),
	"endTime": new Date("2023-03-01T10:53:50Z"),
	"roomId": 8
}, {
	"id": 8,
	"subject": "event 632",
	"startTime": new Date("2023-02-28T07:38:54Z"),
	"endTime": new Date("2023-02-28T08:38:54Z"),
	"roomId": 7
}, {
	"id": 9,
	"subject": "event 371",
	"startTime": new Date("2023-03-01T05:41:27Z"),
	"endTime": new Date("2023-03-01T06:41:27Z"),
	"roomId": 7
}, {
	"id": 10,
	"subject": "event 035",
	"startTime": new Date("2023-03-02T08:23:56Z"),
	"endTime": new Date("2023-03-02T09:23:56Z"),
	"roomId": 6
}, {
	"id": 11,
	"subject": "event 027",
	"startTime": new Date("2023-03-02T11:38:20Z"),
	"endTime": new Date("2023-03-02T12:38:20Z"),
	"roomId": 4
}, {
	"id": 12,
	"subject": "event 301",
	"startTime": new Date("2023-03-01T11:14:15Z"),
	"endTime": new Date("2023-03-01T12:14:15Z"),
	"roomId": 9
}, {
	"id": 13,
	"subject": "event 285",
	"startTime": new Date("2023-03-02T01:57:34Z"),
	"endTime": new Date("2023-03-02T02:57:34Z"),
	"roomId": 1
}, {
	"id": 14,
	"subject": "event 806",
	"startTime": new Date("2023-02-28T19:23:24Z"),
	"endTime": new Date("2023-02-28T20:23:24Z"),
	"roomId": 8
}, {
	"id": 15,
	"subject": "event 510",
	"startTime": new Date("2023-02-28T09:31:12Z"),
	"endTime": new Date("2023-02-28T10:31:12Z"),
	"roomId": 7
},
{
	"id": "15",
	"subject": "event 704",
	"startTime": new Date("2023-03-01T14:43:34Z"),
	"endTime": new Date("2023-03-01T16:13:34Z"),
	"roomId": 1
}, {
	"id": "16",
	"subject": "event 906",
	"startTime": new Date("2023-03-01T01:56:03Z"),
	"endTime": new Date("2023-03-01T03:26:03Z"),
	"roomId": 2
}, {
	"id": "17",
	"subject": "event 944",
	"startTime": new Date("2023-03-02T11:12:21Z"),
	"endTime": new Date("2023-03-02T12:42:21Z"),
	"roomId": 8
}, {
	"id": "18",
	"subject": "event 775",
	"startTime": new Date("2023-02-28T00:32:57Z"),
	"endTime": new Date("2023-02-28T02:02:57Z"),
	"roomId": 3
}, {
	"id": "19",
	"subject": "event 059",
	"startTime": new Date("2023-03-02T11:43:04Z"),
	"endTime": new Date("2023-03-02T13:13:04Z"),
	"roomId": 2
}, {
	"id": "20",
	"subject": "event 442",
	"startTime": new Date("2023-03-02T20:01:20Z"),
	"endTime": new Date("2023-03-02T21:31:20Z"),
	"roomId": 1
}
];

export const employeeData = [{
	"employeeId": 1,
	"employeeFirstName": "Merwyn",
	"employeeLastName": "Maryin",
	"employeeEmail": "mmaryin0@utexas.edu",
	"employeePIN": "907744743",
	"employeePosition": "Librarian",
	"employeeDepartment": "Legal",
	"employeeAvatar": "https://robohash.org/maioresetnisi.png?size=50x50&set=set1"
}, {
	"employeeId": 2,
	"employeeFirstName": "Vaughan",
	"employeeLastName": "Schiementz",
	"employeeEmail": "vschiementz1@sostartroonet.ne.jp",
	"employeePIN": "056155690",
	"employeePosition": "Senior Cost Accountant",
	"employeeDepartment": "Sales",
	"employeeAvatar": "https://robohash.org/utvoluptatumeveniet.png?size=50x50&set=set1"
}, {
	"employeeId": 3,
	"employeeFirstName": "Ryley",
	"employeeLastName": "McClunaghan",
	"employeeEmail": "rmcclunaghan2@yandex.ru",
	"employeePIN": "238163212",
	"employeePosition": "Graphic Designer",
	"employeeDepartment": "Legal",
	"employeeAvatar": "https://robohash.org/quisvoluptatibusquae.png?size=50x50&set=set1"
}, {
	"employeeId": 4,
	"employeeFirstName": "Quinlan",
	"employeeLastName": "Ainsley",
	"employeeEmail": "qainsley3@de.vu",
	"employeePIN": "142955739",
	"employeePosition": "Environmental Tech",
	"employeeDepartment": "Engineering",
	"employeeAvatar": "https://robohash.org/exsaepeautem.png?size=50x50&set=set1"
}, {
	"employeeId": 5,
	"employeeFirstName": "Nathan",
	"employeeLastName": "Jeaycock",
	"employeeEmail": "njeaycock4@examiner.com",
	"employeePIN": "199542997",
	"employeePosition": "Help Desk Operator",
	"employeeDepartment": "Services",
	"employeeAvatar": "https://robohash.org/voluptatemmaximererum.png?size=50x50&set=set1"
}, {
	"employeeId": 6,
	"employeeFirstName": "Chandler",
	"employeeLastName": "Izkovitz",
	"employeeEmail": "cizkovitz5@lycos.com",
	"employeePIN": "474943210",
	"employeePosition": "Senior Developer",
	"employeeDepartment": "Services",
	"employeeAvatar": "https://robohash.org/aspernaturquoomnis.png?size=50x50&set=set1"
}, {
	"employeeId": 7,
	"employeeFirstName": "Clint",
	"employeeLastName": "Denman",
	"employeeEmail": "cdenman6@taobao.com",
	"employeePIN": "486466866",
	"employeePosition": "Clinical Specialist",
	"employeeDepartment": "Product Management",
	"employeeAvatar": "https://robohash.org/quiaautminus.png?size=50x50&set=set1"
}, {
	"employeeId": 8,
	"employeeFirstName": "Solly",
	"employeeLastName": "Caird",
	"employeeEmail": "scaird7@paypal.com",
	"employeePIN": "280750674",
	"employeePosition": "Information Systems Manager",
	"employeeDepartment": "Training",
	"employeeAvatar": "https://robohash.org/corporisquinon.png?size=50x50&set=set1"
}, {
	"employeeId": 9,
	"employeeFirstName": "Gan",
	"employeeLastName": "Kacheler",
	"employeeEmail": "gkacheler8@chron.com",
	"employeePIN": "744642766",
	"employeePosition": "Administrative Assistant II",
	"employeeDepartment": "Research and Development",
	"employeeAvatar": "https://robohash.org/utvelitdeleniti.png?size=50x50&set=set1"
}, {
	"employeeId": 10,
	"employeeFirstName": "Joceline",
	"employeeLastName": "Mattheissen",
	"employeeEmail": "jmattheissen9@blogs.com",
	"employeePIN": "249062884",
	"employeePosition": "Physical Therapy Assistant",
	"employeeDepartment": "Engineering",
	"employeeAvatar": "https://robohash.org/beataeillumaut.png?size=50x50&set=set1"
}, {
	"employeeId": 11,
	"employeeFirstName": "Gerald",
	"employeeLastName": "Pineaux",
	"employeeEmail": "gpineauxa@trellian.com",
	"employeePIN": "753678024",
	"employeePosition": "Legal Assistant",
	"employeeDepartment": "Research and Development",
	"employeeAvatar": "https://robohash.org/sapienteestlabore.png?size=50x50&set=set1"
}, {
	"employeeId": 12,
	"employeeFirstName": "Henriette",
	"employeeLastName": "Greenhaugh",
	"employeeEmail": "hgreenhaughb@spotify.com",
	"employeePIN": "231941213",
	"employeePosition": "Senior Cost Accountant",
	"employeeDepartment": "Services",
	"employeeAvatar": "https://robohash.org/ineosmolestias.png?size=50x50&set=set1"
}, {
	"employeeId": 13,
	"employeeFirstName": "Julia",
	"employeeLastName": "Gianulli",
	"employeeEmail": "jgianullic@wisc.edu",
	"employeePIN": "087747723",
	"employeePosition": "Health Coach I",
	"employeeDepartment": "Legal",
	"employeeAvatar": "https://robohash.org/culpaveniamet.png?size=50x50&set=set1"
}, {
	"employeeId": 14,
	"employeeFirstName": "Franzen",
	"employeeLastName": "Remer",
	"employeeEmail": "fremerd@artisteer.com",
	"employeePIN": "307587970",
	"employeePosition": "VP Sales",
	"employeeDepartment": "Support",
	"employeeAvatar": "https://robohash.org/consequaturdelectusdignissimos.png?size=50x50&set=set1"
}, {
	"employeeId": 15,
	"employeeFirstName": "Irina",
	"employeeLastName": "Fanthome",
	"employeeEmail": "ifanthomee@princeton.edu",
	"employeePIN": "841305126",
	"employeePosition": "Marketing Manager",
	"employeeDepartment": "Research and Development",
	"employeeAvatar": "https://robohash.org/inmaioresofficiis.png?size=50x50&set=set1"
}];
