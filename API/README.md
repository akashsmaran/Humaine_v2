#initial
intent = ""
previntent = ""

if(intent=="followup"):
intent = previntent

corres_index = dict[intent]%len(dict[intent])
return dict[intent[corres_index]]
previntent = intent
corres_index++
