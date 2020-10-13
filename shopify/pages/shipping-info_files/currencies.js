  var Currency = {
    rates: {"USD":1.0,"EUR":1.18314,"GBP":1.30453,"CAD":0.7626,"ARS":0.0129616,"AUD":0.724417,"BRL":0.180787,"CLP":0.00125813,"CNY":0.149391,"CYP":0.397899,"CZK":0.0437852,"DKK":0.158976,"EEK":0.0706676,"HKD":0.129029,"HUF":0.00332083,"ISK":0.00724392,"INR":0.013692,"JMD":0.00698088,"JPY":0.00947161,"LVL":1.57329,"LTL":0.320236,"MTL":0.293496,"MXN":0.0472783,"NZD":0.667194,"NOK":0.109455,"PLN":0.264752,"SGD":0.739062,"SKK":21.5517,"SIT":175.439,"ZAR":0.0607065,"KRW":0.000874035,"SEK":0.113799,"CHF":1.0996,"TWD":0.0348918,"UYU":0.0234711,"MYR":0.241697,"BSD":1.0,"CRC":0.00165408,"RON":0.242811,"PHP":0.0206685,"AED":0.272294,"VEB":0.000100125,"IDR":6.78902e-05,"TRY":0.12724,"THB":0.0322616,"TTD":0.14871,"ILS":0.29595,"SYP":0.00195304,"XCD":0.37037,"COP":0.000261231,"RUB":0.0130415,"HRK":0.156182,"KZT":0.00234095,"TZS":0.000431304,"XPT":889.871,"SAR":0.266667,"NIO":0.02886,"LAK":0.000108134,"OMR":2.60078,"AMD":0.00203687,"CDF":0.000508239,"KPW":0.00111111,"SPL":6.0,"KES":0.00920803,"ZWD":0.00276319,"KHR":0.000244004,"MVR":0.0646813,"GTQ":0.1286,"BZD":0.49623,"BYR":3.8835e-05,"LYD":0.73046,"DZD":0.00770999,"BIF":0.000518895,"GIP":1.30453,"BOB":0.144821,"XOF":0.00180369,"STD":4.81943e-05,"NGN":0.00261098,"PGK":0.285612,"ERN":0.0666667,"MWK":0.0013247,"CUP":0.0377358,"GMD":0.01932,"CVE":0.0107295,"BTN":0.013692,"XAF":0.00180369,"UGX":0.000270151,"MAD":0.10892,"MNT":0.000349958,"LSL":0.0607065,"XAG":25.145,"TOP":0.420803,"SHP":1.30453,"RSD":0.010055,"HTG":0.0155035,"MGA":0.000256752,"MZN":0.013814,"FKP":1.30453,"BWP":0.0870545,"HNL":0.0409189,"PYG":0.000142068,"JEP":1.30453,"EGP":0.0637215,"LBP":0.00066335,"ANG":0.55944,"WST":0.375898,"TVD":0.724417,"GYD":0.00475794,"GGP":1.30453,"NPR":0.00851759,"KMF":0.00240492,"IRR":2.37951e-05,"XPD":2452.7,"SRD":0.0710227,"TMM":5.71429e-05,"SZL":0.0607065,"MOP":0.125271,"BMD":1.0,"XPF":0.00991472,"ETB":0.0270639,"JOD":1.41044,"MDL":0.0593472,"MRO":0.00269541,"YER":0.00399441,"BAM":0.60493,"AWG":0.558659,"PEN":0.279442,"VEF":0.100125,"SLL":0.00010109,"KYD":1.21951,"AOA":0.00156407,"TND":0.363109,"TJS":0.0968092,"SCR":0.0535373,"LKR":0.0054283,"DJF":0.00561799,"GNF":0.000102127,"VUV":0.00886085,"SDG":0.0181447,"IMP":1.30453,"GEL":0.310241,"FJD":0.46729,"DOP":0.0171134,"XDR":1.4146,"MUR":0.0249379,"MMK":0.000781955,"LRD":0.00505299,"BBD":0.5,"ZMK":4.95795e-05,"XAU":1930.41,"VND":4.30641e-05,"UAH":0.0352172,"TMT":0.285714,"IQD":0.000840108,"BGN":0.60493,"KGS":0.0125602,"RWF":0.00104314,"BHD":2.65957,"UZS":9.68992e-05,"PKR":0.00610903,"MKD":0.0191534,"AFN":0.013026,"NAD":0.0607065,"BDT":0.0117861,"AZN":0.588589,"SOS":0.00171511,"QAR":0.274725,"PAB":1.0,"CUC":1.0,"SVC":0.114286,"SBD":0.123,"ALL":0.00953296,"BND":0.739062,"KWD":3.26639,"GHS":0.173862,"ZMW":0.0495795,"XBT":11394.5,"NTD":0.0337206,"BYN":0.38835,"CNH":0.149498,"MRU":0.0269541,"STN":0.0481943,"VES":2.26936e-06,"MXV":0.307097},
    convert: function(amount, from, to) {
      return (amount * this.rates[from]) / this.rates[to];
    }
  };
