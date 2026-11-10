// Bilingual question bank. Every visible string carries { en, hi }.
// type: single | multi | scale | text | number | yesno

const o = (value, en, hi) => ({ value, en, hi });
const q = (id, type, en, hi, extra = {}) => ({ id, type, en, hi, ...extra });

const YESNO = [
  o('yes', 'Yes', 'हाँ'),
  o('no', 'No', 'नहीं'),
];
const LANGS = [
  o('hindi', 'Hindi', 'हिन्दी'),
  o('english', 'English', 'अंग्रेज़ी'),
  o('both', 'Both Hindi + English', 'हिन्दी और अंग्रेज़ी दोनों'),
  o('other', 'Other regional language', 'कोई अन्य क्षेत्रीय भाषा'),
];

/* ------------------------------------------------------------------ */
/* 1. KisanSetu — farmer to buyer                                      */
/* ------------------------------------------------------------------ */

const FARMER_QUESTIONS = [
  q('f1', 'single', 'How much farmland do you cultivate?', 'आप कितनी ज़मीन पर खेती करते हैं?', {
    options: [
      o('lt1', 'Less than 1 acre', '1 एकड़ से कम'),
      o('1-2', '1–2 acres', '1–2 एकड़'),
      o('2-5', '2–5 acres', '2–5 एकड़'),
      o('5-10', '5–10 acres', '5–10 एकड़'),
      o('gt10', 'More than 10 acres', '10 एकड़ से ज़्यादा'),
    ],
  }),
  q('f2', 'multi', 'Which crops do you grow? (choose all)', 'आप कौन-सी फ़सलें उगाते हैं? (सभी चुनें)', {
    options: [
      o('wheat', 'Wheat', 'गेहूँ'),
      o('paddy', 'Paddy / rice', 'धान / चावल'),
      o('sugarcane', 'Sugarcane', 'गन्ना'),
      o('pulses', 'Pulses (dal)', 'दालें'),
      o('mustard', 'Mustard / oilseed', 'सरसों / तिलहन'),
      o('vegetables', 'Vegetables', 'सब्ज़ियाँ'),
      o('fruits', 'Fruits', 'फल'),
      o('cotton', 'Cotton', 'कपास'),
      o('dairy', 'Milk / dairy', 'दूध / डेयरी'),
      o('other', 'Other', 'अन्य'),
    ],
  }),
  q('f3', 'single', 'Where do you sell most of your produce today?', 'आज आप अपनी ज़्यादातर फ़सल कहाँ बेचते हैं?', {
    options: [
      o('trader', 'Village trader / commission agent (arhatiya)', 'गाँव का व्यापारी / आढ़ती'),
      o('mandi', 'Local mandi (mandi yard)', 'स्थानीय मंडी'),
      o('fpo', 'Cooperative / FPO', 'सहकारी समिति / एफपीओ'),
      o('direct', 'Directly to consumers or shops', 'सीधे उपभोक्ता या दुकानों को'),
      o('contract', 'Contract / company buyer', 'कॉन्ट्रैक्ट / कंपनी खरीदार'),
      o('other', 'Other', 'अन्य'),
    ],
  }),
  q('f4', 'single', 'How far is the market you usually sell at?', 'जहाँ आप आमतौर पर बेचते हैं, वह बाज़ार कितना दूर है?', {
    options: [
      o('lt5', 'Less than 5 km', '5 किमी से कम'),
      o('5-10', '5–10 km', '5–10 किमी'),
      o('10-25', '10–25 km', '10–25 किमी'),
      o('25-50', '25–50 km', '25–50 किमी'),
      o('gt50', 'More than 50 km', '50 किमी से ज़्यादा'),
    ],
  }),
  q('f5', 'multi', 'How do you find out today’s price before selling?', 'बेचने से पहले आज का भाव आप कैसे पता करते हैं?', {
    options: [
      o('farmers', 'Ask other farmers', 'दूसरे किसानों से पूछकर'),
      o('trader', 'Ask the trader / arhatiya', 'व्यापारी / आढ़ती से पूछकर'),
      o('portal', 'Mandi portal or helpline (eNAM)', 'मंडी पोर्टल या हेल्पलाइन (eNAM)'),
      o('whatsapp', 'WhatsApp groups', 'व्हाट्सएप ग्रुप'),
      o('media', 'Radio / TV / newspaper', 'रेडियो / टीवी / अख़बार'),
      o('none', 'I do not get price information', 'मुझे भाव की जानकारी नहीं मिलती'),
    ],
  }),
  q('f6', 'single', 'What is your biggest problem in selling produce?', 'फ़सल बेचने में आपकी सबसे बड़ी परेशानी क्या है?', {
    options: [
      o('price', 'I get a low price', 'भाव कम मिलता है'),
      o('delay', 'Payment is delayed', 'पैसा देर से मिलता है'),
      o('transport', 'Transport cost is high', 'ढुलाई का ख़र्च ज़्यादा है'),
      o('weighing', 'Weighing or quality disputes', 'तुलाई या क्वालिटी पर विवाद'),
      o('nobuyer', 'I do not find a buyer', 'खरीदार नहीं मिलता'),
      o('middlemen', 'Too many middlemen', 'बिचौलिए बहुत हैं'),
    ],
  }),
  q('f7', 'single', 'How often is your payment delayed by more than a week?', 'कितनी बार भुगतान एक हफ़्ते से ज़्यादा देर हो जाता है?', {
    options: [
      o('never', 'Never', 'कभी नहीं'),
      o('sometimes', 'Sometimes', 'कभी-कभी'),
      o('often', 'Often', 'अक्सर'),
      o('always', 'Almost always', 'लगभग हमेशा'),
    ],
  }),
  q('f8', 'single', 'Do you know the mandi rate on the day you sell?', 'जिस दिन बेचते हैं, उस दिन का मंडी भाव पता होता है?', {
    options: [
      o('always', 'Yes, always', 'हाँ, हमेशा'),
      o('mostly', 'Mostly', 'अधिकतर'),
      o('sometimes', 'Sometimes', 'कभी-कभी'),
      o('rarely', 'Rarely', 'शायद ही'),
      o('never', 'Never', 'कभी नहीं'),
    ],
  }),
  q('f9', 'single', 'Have you ever sold directly to a buyer (shop, hotel, consumer)?', 'क्या आपने कभी सीधे खरीदार (दुकान, होटल, उपभोक्ता) को बेचा है?', {
    options: [
      o('regular', 'Yes, regularly', 'हाँ, नियमित रूप से'),
      o('few', 'Once or twice', 'एक-दो बार'),
      o('no', 'Never', 'कभी नहीं'),
    ],
  }),
  q('f10', 'single', 'Would you sell directly to buyers through a mobile app?', 'क्या आप मोबाइल ऐप से सीधे खरीदारों को बेचना चाहेंगे?', {
    options: [
      o('yes', 'Yes, if the price is right', 'हाँ, अगर भाव ठीक मिले'),
      o('maybe', 'Maybe, after seeing it work', 'शायद, काम होते देखने के बाद'),
      o('no', 'No, I prefer the mandi', 'नहीं, मंडी ही ठीक है'),
      o('unsure', 'I do not know', 'पता नहीं'),
    ],
  }),
  q('f11', 'single', 'How much higher a price would make direct selling worth it?', 'सीधे बेचने के लिए कितना ऊँचा भाव ज़रूरी है?', {
    options: [
      o('0-5', 'Up to 5% more', '5% तक ज़्यादा'),
      o('5-10', '5–10% more', '5–10% ज़्यादा'),
      o('10-15', '10–15% more', '10–15% ज़्यादा'),
      o('gt15', 'More than 15%', '15% से ज़्यादा'),
      o('any', 'Any fair price is fine', 'उचित भाव चलेगा'),
    ],
  }),
  q('f12', 'single', 'How would you like to be paid?', 'भुगतान कैसे चाहिए?', {
    options: [
      o('cash', 'Cash at pickup', 'उठाते समय नक़द'),
      o('upi', 'UPI / bank transfer on delivery', 'डिलीवरी पर यूपीआई / बैंक ट्रांसफर'),
      o('advance', 'Part advance, rest on delivery', 'कुछ एडवांस, बाकी डिलीवरी पर'),
      o('weekly', 'Weekly settlement', 'हफ़्ते में एक बार'),
    ],
  }),
  q('f13', 'single', 'Who arranges transport today?', 'आज ढुलाई कौन करता है?', {
    options: [
      o('self', 'I arrange and pay for it', 'मैं खुद करता/करती हूँ'),
      o('buyer', 'The buyer picks up', 'खरीदार खुद उठाता है'),
      o('trader', 'The trader / arhatiya', 'व्यापारी / आढ़ती'),
      o('coop', 'Cooperative / FPO', 'सहकारी समिति / एफपीओ'),
      o('none', 'Nobody, I sell at the farm gate', 'कोई नहीं, खेत पर ही बेच देता/देती हूँ'),
    ],
  }),
  q('f14', 'single', 'If the buyer picks up at your farm, what would you pay?', 'अगर खरीदार खेत से ही उठाए, तो आप क्या देना चाहेंगे?', {
    options: [
      o('perqtl', 'A small charge per quintal', 'प्रति क्विंटल थोड़ा शुल्क'),
      o('monthly', 'A fixed monthly fee', 'तय मासिक शुल्क'),
      o('none', 'Nothing, the price must include it', 'कुछ नहीं, भाव में ही शामिल हो'),
    ],
  }),
  q('f15', 'single', 'How much can you supply in one lot?', 'एक बार में कितना माल दे सकते हैं?', {
    options: [
      o('lt100', 'Under 100 kg', '100 किलो से कम'),
      o('100-500', '100–500 kg', '100–500 किलो'),
      o('500-1000', '500 kg – 1 tonne', '500 किलो – 1 टन'),
      o('1-5t', '1–5 tonnes', '1–5 टन'),
      o('gt5t', 'More than 5 tonnes', '5 टन से ज़्यादा'),
    ],
  }),
  q('f16', 'single', 'Do you sort and grade your produce before selling?', 'बेचने से पहले माल की छँटाई/ग्रेडिंग करते हैं?', {
    options: [o('always', 'Always', 'हमेशा'), o('sometimes', 'Sometimes', 'कभी-कभी'), o('never', 'Never', 'कभी नहीं')],
  }),
  q('f17', 'single', 'How comfortable are you with a smartphone?', 'स्मार्टफ़ोन चलाने में कितने सहज हैं?', {
    options: [
      o('daily', 'I use WhatsApp and UPI every day', 'रोज़ व्हाट्सएप और यूपीआई चलाता/चलाती हूँ'),
      o('help', 'I can use an app with some help', 'थोड़ी मदद से ऐप चला सकता/सकती हूँ'),
      o('calls', 'Only calls and messages', 'सिर्फ़ कॉल और मैसेज'),
      o('none', 'I do not use a smartphone', 'स्मार्टफ़ोन नहीं चलाता/चलाती'),
    ],
  }),
  q('f18', 'single', 'In which language should the app speak to you?', 'ऐप आपसे किस भाषा में बात करे?', { options: LANGS }),
  q('f19', 'single', 'What worries you most about selling online?', 'ऑनलाइन बेचने में सबसे बड़ी चिंता क्या है?', {
    options: [
      o('fraud', 'Payment fraud', 'पैसे की ठगी'),
      o('reject', 'Buyer rejects the goods after delivery', 'डिलीवरी के बाद माल लौटा देना'),
      o('transport', 'Transport and loading', 'ढुलाई और चढ़ाई-उतराई'),
      o('fake', 'Fake buyers', 'फ़र्ज़ी खरीदार'),
      o('trust', 'I do not trust apps', 'ऐप पर भरोसा नहीं'),
    ],
  }),
  q(
    'f20',
    'single',
    'If payment is guaranteed within 24 hours, would you list your crop?',
    'अगर 24 घंटे में भुगतान की गारंटी हो, तो आप अपनी फ़सल लिस्ट करेंगे?',
    {
      options: [
        o('definitely', 'Yes, definitely', 'हाँ, ज़रूर'),
        o('probably', 'Probably yes', 'शायद हाँ'),
        o('unsure', 'Not sure', 'पक्का नहीं'),
        o('no', 'No', 'नहीं'),
      ],
    }
  ),
];

const BUYER_QUESTIONS = [
  q('b1', 'single', 'What kind of buyer are you?', 'आप किस तरह के खरीदार हैं?', {
    options: [
      o('kirana', 'Kirana / retail shop', 'किराना / रिटेल दुकान'),
      o('hotel', 'Restaurant / hotel / canteen', 'रेस्टोरेंट / होटल / कैंटीन'),
      o('wholesale', 'Wholesaler / trader', 'थोक व्यापारी'),
      o('processor', 'Processor / factory', 'प्रोसेसिंग / फैक्ट्री'),
      o('exporter', 'Exporter', 'निर्यातक'),
      o('consumer', 'Individual consumer', 'आम उपभोक्ता'),
    ],
  }),
  q('b2', 'single', 'How much fresh produce do you buy in a month?', 'महीने में कितना ताज़ा माल खरीदते हैं?', {
    options: [
      o('lt500', 'Under 500 kg', '500 किलो से कम'),
      o('500-2000', '500 kg – 2 tonnes', '500 किलो – 2 टन'),
      o('2-10', '2–10 tonnes', '2–10 टन'),
      o('10-50', '10–50 tonnes', '10–50 टन'),
      o('gt50', 'More than 50 tonnes', '50 टन से ज़्यादा'),
    ],
  }),
  q('b3', 'single', 'Where do you source from today?', 'आज आप कहाँ से माल लेते हैं?', {
    options: [
      o('mandi', 'Mandi', 'मंडी'),
      o('agent', 'Wholesaler / commission agent', 'थोक व्यापारी / आढ़ती'),
      o('farmer', 'Direct from farmers', 'सीधे किसानों से'),
      o('app', 'Aggregator apps (Zepto, BigBasket, etc.)', 'एग्रीगेटर ऐप (ज़ेप्टो, बिगबास्केट आदि)'),
      o('mixed', 'A mix of the above', 'ऊपर के कई तरीक़े'),
    ],
  }),
  q('b4', 'single', 'How many suppliers do you deal with?', 'आप कितने सप्लायर से काम करते हैं?', {
    options: [o('1', 'One', 'एक'), o('2-3', '2–3', '2–3'), o('4-6', '4–6', '4–6'), o('7+', 'More than 6', '6 से ज़्यादा')],
  }),
  q('b5', 'single', 'What is your biggest procurement problem?', 'खरीदारी में सबसे बड़ी दिक्कत क्या है?', {
    options: [
      o('quality', 'Inconsistent quality', 'क्वालिटी एक जैसी नहीं मिलती'),
      o('price', 'Price changes every day', 'भाव रोज़ बदलता है'),
      o('supply', 'Unreliable supply', 'समय पर माल नहीं मिलता'),
      o('credit', 'Credit (udhaar) terms', 'उधारी की शर्तें'),
      o('transport', 'Transport and loading', 'ढुलाई और चढ़ाई-उतराई'),
      o('wastage', 'Wastage', 'ख़राबा'),
    ],
  }),
  q('b6', 'single', 'How much of your purchase gets wasted or spoiled?', 'खरीदे गए माल का कितना ख़राब हो जाता है?', {
    options: [
      o('lt2', 'Under 2%', '2% से कम'),
      o('2-5', '2–5%', '2–5%'),
      o('5-10', '5–10%', '5–10%'),
      o('gt10', 'More than 10%', '10% से ज़्यादा'),
    ],
  }),
  q('b7', 'single', 'Do you want delivery at your own gate?', 'क्या आपको अपने गेट पर डिलीवरी चाहिए?', {
    options: [
      o('yes', 'Yes, always', 'हाँ, हमेशा'),
      o('sameprice', 'Only if the price stays the same', 'सिर्फ़ तब, जब भाव न बढ़े'),
      o('no', 'No, I will pick up', 'नहीं, मैं खुद उठा लूँगा'),
    ],
  }),
  q('b8', 'multi', 'Which quality points matter most to you? (choose all)', 'क्वालिटी की कौन-सी बातें सबसे ज़रूरी हैं? (सभी चुनें)', {
    options: [
      o('fresh', 'Freshness', 'ताज़गी'),
      o('grade', 'Size and grade', 'साइज़ और ग्रेड'),
      o('residue', 'Low pesticide residue', 'कीटनाशक की कम मात्रा'),
      o('look', 'Appearance and colour', 'दिखावट और रंग'),
      o('taste', 'Taste', 'स्वाद'),
      o('shelf', 'Shelf life', 'ज़्यादा दिन टिकना'),
    ],
  }),
  q('b9', 'single', 'Do you need a residue / quality certificate with each lot?', 'हर खेप के साथ क्वालिटी/अवशेष प्रमाण-पत्र चाहिए?', {
    options: [
      o('mandatory', 'Yes, mandatory', 'हाँ, ज़रूरी है'),
      o('nice', 'Nice to have', 'अच्छा रहेगा'),
      o('no', 'Not required', 'ज़रूरी नहीं'),
    ],
  }),
  q('b10', 'single', 'What payment terms do you expect?', 'भुगतान की क्या शर्तें चाहिए?', {
    options: [
      o('cod', 'Cash on delivery', 'डिलीवरी पर नक़द'),
      o('7', '7 days credit', '7 दिन उधार'),
      o('15', '15 days credit', '15 दिन उधार'),
      o('30', '30 days credit', '30 दिन उधार'),
      o('advance', 'I pay in advance', 'मैं एडवांस देता हूँ'),
    ],
  }),
  q('b11', 'single', 'Compared with the mandi, what price would make you switch?', 'मंडी के मुक़ाबले किस भाव पर आप बदलेंगे?', {
    options: [
      o('cheap5', '5–10% cheaper is needed', '5–10% सस्ता चाहिए'),
      o('cheap10', '10–15% cheaper is needed', '10–15% सस्ता चाहिए'),
      o('same', 'Same price is fine if quality is better', 'भाव बराबर चलेगा अगर क्वालिटी बेहतर हो'),
      o('higher', 'I can pay more for reliable supply', 'भरोसेमंद सप्लाई के लिए ज़्यादा दे सकता हूँ'),
    ],
  }),
  q('b12', 'single', 'How often would you order?', 'आप कितनी बार ऑर्डर करेंगे?', {
    options: [
      o('daily', 'Daily', 'रोज़'),
      o('2-3', '2–3 times a week', 'हफ़्ते में 2–3 बार'),
      o('weekly', 'Weekly', 'हफ़्ते में एक बार'),
      o('fortnight', 'Fortnightly', 'पंद्रह दिन में'),
    ],
  }),
  q('b13', 'single', 'How do you prefer to place orders?', 'ऑर्डर कैसे देना पसंद है?', {
    options: [
      o('app', 'Mobile app', 'मोबाइल ऐप'),
      o('whatsapp', 'WhatsApp message', 'व्हाट्सएप मैसेज'),
      o('call', 'Phone call', 'फ़ोन कॉल'),
      o('salesman', 'Salesman visit', 'सेल्समैन के आने पर'),
    ],
  }),
  q('b14', 'single', 'Do you need a GST invoice?', 'क्या आपको जीएसटी बिल चाहिए?', {
    options: [
      o('yes', 'Yes, always', 'हाँ, हमेशा'),
      o('sometimes', 'Sometimes', 'कभी-कभी'),
      o('no', 'No', 'नहीं'),
    ],
  }),
  q('b15', 'single', 'What platform fee per order would you accept?', 'प्रति ऑर्डर कितना प्लेटफ़ॉर्म शुल्क ठीक लगेगा?', {
    options: [
      o('0', 'None', 'कुछ नहीं'),
      o('lt2', 'Under 2%', '2% से कम'),
      o('2-5', '2–5%', '2–5%'),
      o('gt5', 'More than 5%, if service is good', '5% से ज़्यादा, अगर सेवा अच्छी हो'),
    ],
  }),
  q('b16', 'single', 'Would you verify a new supplier before the first order?', 'पहले ऑर्डर से पहले नए सप्लायर को जाँचेंगे?', {
    options: [
      o('visit', 'Yes, I would visit the farm', 'हाँ, खेत पर जाकर देखूँगा'),
      o('video', 'Yes, a video call is enough', 'हाँ, वीडियो कॉल से हो जाएगा'),
      o('sample', 'Only a sample delivery', 'सिर्फ़ सैंपल मँगाकर'),
      o('no', 'No, I trust the platform', 'नहीं, प्लेटफ़ॉर्म पर भरोसा है'),
    ],
  }),
  q('b17', 'multi', 'What would make you trust a new supplier? (choose all)', 'नए सप्लायर पर भरोसा किससे बनेगा? (सभी चुनें)', {
    options: [
      o('sample', 'Sample before bulk order', 'बड़े ऑर्डर से पहले सैंपल'),
      o('ratings', 'Ratings from other buyers', 'दूसरे खरीदारों की रेटिंग'),
      o('escrow', 'Payment held until delivery', 'डिलीवरी तक पैसा सुरक्षित'),
      o('replace', 'Replacement for bad goods', 'ख़राब माल की जगह नया'),
      o('licence', 'FSSAI / licence papers', 'एफएसएसएआई / लाइसेंस कागज़'),
    ],
  }),
  q('b18', 'single', 'Which delivery time suits you?', 'डिलीवरी का कौन-सा समय ठीक है?', {
    options: [
      o('early', '4–8 am', 'सुबह 4–8'),
      o('morning', 'Before 10 am', 'सुबह 10 बजे से पहले'),
      o('flex', 'Any time in the day', 'दिन में कभी भी'),
      o('evening', 'Evening', 'शाम'),
    ],
  }),
  q('b19', 'single', 'In which language should the app speak to you?', 'ऐप आपसे किस भाषा में बात करे?', { options: LANGS }),
  q(
    'b20',
    'single',
    'Would you use a platform with live prices and farm traceability?',
    'क्या आप लाइव भाव और खेत की ट्रेसेबिलिटी वाला प्लेटफ़ॉर्म इस्तेमाल करेंगे?',
    {
      options: [
        o('definitely', 'Yes, definitely', 'हाँ, ज़रूर'),
        o('probably', 'Probably yes', 'शायद हाँ'),
        o('unsure', 'Not sure', 'पक्का नहीं'),
        o('no', 'No', 'नहीं'),
      ],
    }
  ),
];

/* ------------------------------------------------------------------ */
/* 2. KiranaSetu — village kirana / paan shop to wholesaler            */
/* ------------------------------------------------------------------ */

const KIRANA_QUESTIONS = [
  q('k1', 'single', 'What kind of shop do you run?', 'आपकी दुकान किस तरह की है?', {
    options: [
      o('kirana', 'Kirana / general store', 'किराना / जनरल स्टोर'),
      o('paan', 'Paan shop', 'पान की दुकान'),
      o('both', 'Kirana and paan both', 'किराना और पान दोनों'),
      o('mini', 'Mini supermarket', 'मिनी सुपरमार्केट'),
      o('other', 'Other', 'अन्य'),
    ],
  }),
  q('k2', 'single', 'How big is your village or town?', 'आपका गाँव या क़स्बा कितना बड़ा है?', {
    options: [
      o('lt2', 'Under 2,000 people', '2,000 से कम लोग'),
      o('2-5', '2,000–5,000', '2,000–5,000'),
      o('5-10', '5,000–10,000', '5,000–10,000'),
      o('10-25', '10,000–25,000', '10,000–25,000'),
      o('gt25', 'Above 25,000', '25,000 से ज़्यादा'),
    ],
  }),
  q('k3', 'single', 'How long have you been running this shop?', 'यह दुकान कितने साल से चला रहे हैं?', {
    options: [
      o('lt2', 'Under 2 years', '2 साल से कम'),
      o('2-5', '2–5 years', '2–5 साल'),
      o('5-10', '5–10 years', '5–10 साल'),
      o('gt10', 'More than 10 years', '10 साल से ज़्यादा'),
    ],
  }),
  q('k4', 'single', 'Who supplies your stock today?', 'आज माल कौन सप्लाई करता है?', {
    options: [
      o('town', 'Town wholesaler', 'क़स्बे का थोक व्यापारी'),
      o('distributor', 'Company distributor / salesman', 'कंपनी डिस्ट्रीब्यूटर / सेल्समैन'),
      o('cashcarry', 'Cash-and-carry store', 'कैश एंड कैरी स्टोर'),
      o('self', 'I buy it myself from the mandi', 'मैं खुद मंडी से लाता हूँ'),
      o('mixed', 'Several of these', 'कई स्रोत'),
    ],
  }),
  q('k5', 'single', 'How do you place an order today?', 'आज ऑर्डर कैसे देते हैं?', {
    options: [
      o('call', 'Phone call', 'फ़ोन कॉल'),
      o('whatsapp', 'WhatsApp', 'व्हाट्सएप'),
      o('salesman', 'When the salesman visits', 'सेल्समैन आने पर'),
      o('visit', 'I go to the shop myself', 'मैं खुद दुकान पर जाता हूँ'),
      o('app', 'An app', 'किसी ऐप से'),
    ],
  }),
  q('k6', 'single', 'How far do you travel to buy stock?', 'माल लेने कितना दूर जाना पड़ता है?', {
    options: [
      o('lt5', 'Under 5 km', '5 किमी से कम'),
      o('5-15', '5–15 km', '5–15 किमी'),
      o('15-30', '15–30 km', '15–30 किमी'),
      o('gt30', 'More than 30 km', '30 किमी से ज़्यादा'),
    ],
  }),
  q('k7', 'single', 'How often do you buy stock?', 'कितनी बार माल भरते हैं?', {
    options: [
      o('daily', 'Daily', 'रोज़'),
      o('2-3', '2–3 times a week', 'हफ़्ते में 2–3 बार'),
      o('weekly', 'Weekly', 'हफ़्ते में एक बार'),
      o('fortnight', 'Fortnightly', 'पंद्रह दिन में'),
    ],
  }),
  q('k8', 'single', 'What is your average order value?', 'एक बार में औसतन कितने का माल लेते हैं?', {
    options: [
      o('lt5k', 'Under ₹5,000', '₹5,000 से कम'),
      o('5-15k', '₹5,000–15,000', '₹5,000–15,000'),
      o('15-50k', '₹15,000–50,000', '₹15,000–50,000'),
      o('50k-1l', '₹50,000–1 lakh', '₹50,000–1 लाख'),
      o('gt1l', 'Above ₹1 lakh', '₹1 लाख से ज़्यादा'),
    ],
  }),
  q('k9', 'single', 'Biggest problem with your current supplier?', 'मौजूदा सप्लायर में सबसे बड़ी दिक्कत?', {
    options: [
      o('stockout', 'Items run out of stock', 'माल ख़त्म मिलता है'),
      o('price', 'Prices are high', 'भाव ज़्यादा है'),
      o('delay', 'Delivery is late', 'डिलीवरी देर से'),
      o('credit', 'Credit limit is small', 'उधार की सीमा कम है'),
      o('moq', 'They force a minimum order', 'कम माल पर नहीं देते'),
      o('damage', 'Damaged goods arrive', 'टूटा-फूटा माल आता है'),
    ],
  }),
  q('k10', 'single', 'How many items are out of stock in a week?', 'हफ़्ते में कितने आइटम ख़त्म रह जाते हैं?', {
    options: [
      o('0', 'None', 'कोई नहीं'),
      o('1-3', '1–3', '1–3'),
      o('4-7', '4–7', '4–7'),
      o('gt7', 'More than 7', '7 से ज़्यादा'),
    ],
  }),
  q('k11', 'single', 'Do you get credit from your supplier?', 'सप्लायर उधार देता है?', {
    options: [
      o('7', 'Yes, about 7 days', 'हाँ, लगभग 7 दिन'),
      o('15', 'Yes, about 15 days', 'हाँ, लगभग 15 दिन'),
      o('30', 'Yes, about 30 days', 'हाँ, लगभग 30 दिन'),
      o('no', 'No, I pay cash', 'नहीं, नक़द देता हूँ'),
    ],
  }),
  q('k12', 'single', 'If stock is delivered to your door, what delivery charge is fair?', 'घर तक माल आए तो कितना डिलीवरी शुल्क ठीक है?', {
    options: [
      o('none', 'Nothing', 'कुछ नहीं'),
      o('20-50', '₹20–50 per order', '₹20–50 प्रति ऑर्डर'),
      o('50-100', '₹50–100 per order', '₹50–100 प्रति ऑर्डर'),
      o('pct', 'A small percentage of the bill', 'बिल का थोड़ा प्रतिशत'),
    ],
  }),
  q('k13', 'single', 'Free delivery above which order value?', 'कितने के ऑर्डर पर मुफ़्त डिलीवरी ठीक लगेगी?', {
    options: [
      o('1k', '₹1,000', '₹1,000'),
      o('2k', '₹2,000', '₹2,000'),
      o('5k', '₹5,000', '₹5,000'),
      o('10k', '₹10,000', '₹10,000'),
      o('na', 'Does not matter', 'इससे फ़र्क़ नहीं पड़ता'),
    ],
  }),
  q('k14', 'single', 'Do you have space to receive a full delivery?', 'पूरा माल रखने की जगह है?', {
    options: [
      o('yes', 'Yes, enough space', 'हाँ, पूरी जगह है'),
      o('limited', 'Limited space', 'सीमित जगह है'),
      o('no', 'No, I buy in small lots', 'नहीं, थोड़ा-थोड़ा लेता हूँ'),
    ],
  }),
  q('k15', 'single', 'Would you pay a little more for guaranteed next-day delivery?', 'अगले दिन पक्की डिलीवरी के लिए थोड़ा ज़्यादा देंगे?', {
    options: [
      o('yes', 'Yes, up to 3% more', 'हाँ, 3% तक ज़्यादा'),
      o('maybe', 'Only for fast-moving items', 'सिर्फ़ ज़्यादा बिकने वाले माल पर'),
      o('no', 'No', 'नहीं'),
    ],
  }),
  q('k16', 'multi', 'Which apps do you already use for the shop?', 'दुकान के लिए कौन-से ऐप पहले से चलाते हैं?', {
    options: [
      o('billing', 'Billing / GST app', 'बिलिंग / जीएसटी ऐप'),
      o('order', 'Ordering app', 'ऑर्डर ऐप'),
      o('upi', 'UPI / payments', 'यूपीआई / पेमेंट'),
      o('khata', 'Digital khata / ledger', 'डिजिटल खाता'),
      o('none', 'None', 'कोई नहीं'),
    ],
  }),
  q('k17', 'single', 'How comfortable are you with a smartphone?', 'स्मार्टफ़ोन चलाने में कितने सहज हैं?', {
    options: [
      o('daily', 'I use WhatsApp and UPI daily', 'रोज़ व्हाट्सएप और यूपीआई चलाता हूँ'),
      o('basic', 'Only basic apps', 'सिर्फ़ बुनियादी ऐप'),
      o('family', 'A family member helps me', 'घर का कोई सदस्य मदद करता है'),
      o('keypad', 'I have a keypad phone', 'मेरे पास कीपैड फ़ोन है'),
    ],
  }),
  q('k18', 'single', 'How would you prefer to pay?', 'भुगतान कैसे करना पसंद है?', {
    options: [
      o('cod', 'Cash on delivery', 'डिलीवरी पर नक़द'),
      o('upi', 'UPI on delivery', 'डिलीवरी पर यूपीआई'),
      o('7', '7 days credit', '7 दिन उधार'),
      o('15', '15 days credit', '15 दिन उधार'),
    ],
  }),
  q('k19', 'single', 'Would you change your main supplier for better margin and delivery?', 'बेहतर मार्जिन और डिलीवरी के लिए मुख्य सप्लायर बदलेंगे?', {
    options: [
      o('yes', 'Yes, if it works', 'हाँ, अगर काम करे'),
      o('trial', 'Only after a trial month', 'एक महीने आज़माने के बाद'),
      o('no', 'No, my supplier is reliable', 'नहीं, मेरा सप्लायर ठीक है'),
    ],
  }),
  q('k20', 'single', 'Which single feature matters most to you?', 'सबसे ज़रूरी एक चीज़ कौन-सी है?', {
    options: [
      o('price', 'Lower price', 'कम भाव'),
      o('speed', 'Fast delivery', 'तेज़ डिलीवरी'),
      o('credit', 'Easy credit', 'आसान उधार'),
      o('stock', 'Full stock availability', 'पूरा माल उपलब्ध'),
      o('returns', 'Easy returns', 'आसान वापसी'),
    ],
  }),
];

const WHOLESALER_QUESTIONS = [
  q('w1', 'single', 'What kind of business do you run?', 'आपका व्यापार किस तरह का है?', {
    options: [
      o('distributor', 'Distributor', 'डिस्ट्रीब्यूटर'),
      o('wholesale', 'Wholesaler', 'थोक व्यापारी'),
      o('cashcarry', 'Cash-and-carry', 'कैश एंड कैरी'),
      o('cfa', 'Company C&F agent', 'कंपनी का सीएंडएफ एजेंट'),
      o('semi', 'Semi-wholesaler', 'अर्ध-थोक व्यापारी'),
    ],
  }),
  q('w2', 'single', 'How many retail shops do you supply?', 'कितनी रिटेल दुकानों को माल देते हैं?', {
    options: [
      o('lt25', 'Under 25', '25 से कम'),
      o('25-100', '25–100', '25–100'),
      o('100-300', '100–300', '100–300'),
      o('gt300', 'More than 300', '300 से ज़्यादा'),
    ],
  }),
  q('w3', 'single', 'What is your delivery radius?', 'डिलीवरी कितने दायरे में करते हैं?', {
    options: [
      o('lt10', 'Under 10 km', '10 किमी से कम'),
      o('10-25', '10–25 km', '10–25 किमी'),
      o('25-50', '25–50 km', '25–50 किमी'),
      o('gt50', 'More than 50 km', '50 किमी से ज़्यादा'),
    ],
  }),
  q('w4', 'single', 'How do retailers place orders with you today?', 'दुकानदार आज ऑर्डर कैसे देते हैं?', {
    options: [
      o('salesman', 'Salesman visits the shop', 'सेल्समैन दुकान पर जाता है'),
      o('call', 'Phone calls', 'फ़ोन कॉल'),
      o('whatsapp', 'WhatsApp', 'व्हाट्सएप'),
      o('mixed', 'A mix of these', 'कई तरीक़े'),
    ],
  }),
  q('w5', 'single', 'How many delivery vehicles do you have?', 'कितनी डिलीवरी गाड़ियाँ हैं?', {
    options: [
      o('0-1', '0–1', '0–1'),
      o('2-3', '2–3', '2–3'),
      o('4-6', '4–6', '4–6'),
      o('gt6', 'More than 6', '6 से ज़्यादा'),
    ],
  }),
  q('w6', 'single', 'What is your last-mile cost per order?', 'प्रति ऑर्डर आख़िरी डिलीवरी का ख़र्च?', {
    options: [
      o('lt30', 'Under ₹30', '₹30 से कम'),
      o('30-60', '₹30–60', '₹30–60'),
      o('60-100', '₹60–100', '₹60–100'),
      o('gt100', 'Above ₹100', '₹100 से ज़्यादा'),
      o('unknown', 'I do not track it', 'हिसाब नहीं रखता'),
    ],
  }),
  q('w7', 'single', 'Biggest operational problem?', 'सबसे बड़ी परिचालन समस्या?', {
    options: [
      o('route', 'Route planning', 'रूट प्लानिंग'),
      o('orders', 'Taking orders', 'ऑर्डर लेना'),
      o('returns', 'Returns and claims', 'वापसी और क्लेम'),
      o('credit', 'Recovering credit', 'उधारी वसूलना'),
      o('stock', 'Stock management', 'स्टॉक प्रबंधन'),
      o('staff', 'Manpower', 'स्टाफ़'),
    ],
  }),
  q('w8', 'single', 'How many hours a day go into taking orders?', 'ऑर्डर लेने में रोज़ कितने घंटे लगते हैं?', {
    options: [
      o('lt1', 'Under 1 hour', '1 घंटे से कम'),
      o('1-3', '1–3 hours', '1–3 घंटे'),
      o('3-6', '3–6 hours', '3–6 घंटे'),
      o('gt6', 'More than 6 hours', '6 घंटे से ज़्यादा'),
    ],
  }),
  q('w9', 'single', 'Would you use a platform that groups kirana orders by route?', 'दुकानों के ऑर्डर रूट के हिसाब से जोड़ने वाला प्लेटफ़ॉर्म चलाएँगे?', {
    options: [
      o('yes', 'Yes, definitely', 'हाँ, ज़रूर'),
      o('maybe', 'Maybe, if it saves cost', 'शायद, अगर ख़र्च बचे'),
      o('no', 'No, my system works', 'नहीं, मेरा सिस्टम ठीक है'),
    ],
  }),
  q('w10', 'single', 'What commission per order would you pay?', 'प्रति ऑर्डर कितना कमीशन देंगे?', {
    options: [
      o('0', 'None', 'कुछ नहीं'),
      o('1-2', '1–2%', '1–2%'),
      o('2-5', '2–5%', '2–5%'),
      o('fixed', 'A fixed monthly fee instead', 'इसके बजाय तय मासिक शुल्क'),
    ],
  }),
  q('w11', 'single', 'Do you have a billing or ERP system?', 'बिलिंग या ईआरपी सिस्टम है?', {
    options: [
      o('erp', 'Yes, full ERP', 'हाँ, पूरा ईआरपी'),
      o('tally', 'Tally only', 'सिर्फ़ टैली'),
      o('manual', 'Manual register / books', 'हाथ से रजिस्टर'),
      o('none', 'Nothing', 'कुछ नहीं'),
    ],
  }),
  q('w12', 'single', 'How often should the platform settle payments?', 'प्लेटफ़ॉर्म भुगतान कितनी बार निपटाए?', {
    options: [
      o('daily', 'Daily', 'रोज़'),
      o('weekly', 'Weekly', 'हफ़्ते में'),
      o('fortnight', 'Fortnightly', 'पंद्रह दिन में'),
      o('monthly', 'Monthly', 'महीने में'),
    ],
  }),
  q('w13', 'single', 'What is your biggest credit risk?', 'उधारी में सबसे बड़ा जोखिम?', {
    options: [
      o('bad', 'Bad debt from shops', 'दुकानदारों का कर्ज़ा डूबना'),
      o('delay', 'Late payments', 'देर से भुगतान'),
      o('returns', 'Returns after billing', 'बिल के बाद वापसी'),
      o('none', 'No major risk', 'कोई बड़ा जोखिम नहीं'),
    ],
  }),
  q('w14', 'single', 'Do you accept returns from retailers?', 'दुकानदारों से माल वापस लेते हैं?', {
    options: [
      o('sameday', 'Yes, same day', 'हाँ, उसी दिन'),
      o('nextvisit', 'Yes, on the next visit', 'हाँ, अगली बार'),
      o('no', 'No', 'नहीं'),
    ],
  }),
  q('w15', 'single', 'Would live stock visibility cut your phone calls?', 'लाइव स्टॉक दिखने से फ़ोन कॉल कम होंगे?', {
    options: [
      o('alot', 'Yes, a lot', 'हाँ, बहुत'),
      o('some', 'Somewhat', 'कुछ हद तक'),
      o('no', 'No', 'नहीं'),
    ],
  }),
  q('w16', 'single', 'How many new retailers can you take on each month?', 'महीने में कितनी नई दुकानें जोड़ सकते हैं?', {
    options: [
      o('lt5', 'Under 5', '5 से कम'),
      o('5-15', '5–15', '5–15'),
      o('15-30', '15–30', '15–30'),
      o('gt30', 'More than 30', '30 से ज़्यादा'),
    ],
  }),
  q('w17', 'multi', 'What would make you join early? (choose all)', 'जल्दी जुड़ने के लिए क्या मदद करेगा? (सभी चुनें)', {
    options: [
      o('orders', 'More orders', 'ज़्यादा ऑर्डर'),
      o('route', 'Better route efficiency', 'बेहतर रूट'),
      o('ledger', 'Digital ledger and billing', 'डिजिटल खाता और बिलिंग'),
      o('listing', 'Free listing and branding', 'मुफ़्त लिस्टिंग और ब्रांडिंग'),
      o('credit', 'Help with credit recovery', 'उधारी वसूलने में मदद'),
    ],
  }),
  q('w18', 'single', 'Do you need GST invoicing through the platform?', 'प्लेटफ़ॉर्म से जीएसटी बिलिंग चाहिए?', {
    options: [
      o('yes', 'Yes, essential', 'हाँ, ज़रूरी है'),
      o('optional', 'Optional', 'वैकल्पिक'),
      o('no', 'No', 'नहीं'),
    ],
  }),
  q('w19', 'single', 'Which delivery window can you commit to?', 'कौन-सा डिलीवरी समय पक्का कर सकते हैं?', {
    options: [
      o('before10', 'Before 10 am', 'सुबह 10 बजे से पहले'),
      o('midday', '10 am – 2 pm', '10 से 2 बजे'),
      o('flex', 'Flexible through the day', 'दिन भर लचीला'),
      o('same', 'Same evening', 'उसी शाम'),
    ],
  }),
  q('w20', 'single', 'Would you share a delivery van or e-rickshaw with other wholesalers?', 'दूसरे थोक व्यापारियों के साथ गाड़ी या ई-रिक्शा साझा करेंगे?', {
    options: [o('yes', 'Yes, if cost drops', 'हाँ, अगर ख़र्च घटे'), o('maybe', 'Maybe later', 'शायद बाद में'), o('no', 'No', 'नहीं')],
  }),
];

/* ------------------------------------------------------------------ */
/* 3. Nukkad — localized digital marketing automation SaaS             */
/* ------------------------------------------------------------------ */

const BUSINESS_TYPES = [
  o('grocery', 'Kirana / grocery', 'किराना / किराना स्टोर'),
  o('restaurant', 'Restaurant / cafe / sweets', 'रेस्टोरेंट / कैफ़े / मिठाई'),
  o('salon', 'Salon / beauty parlour', 'सैलून / ब्यूटी पार्लर'),
  o('boutique', 'Clothing / boutique', 'कपड़े / बुटीक'),
  o('mobile', 'Mobile / electronics repair', 'मोबाइल / इलेक्ट्रॉनिक्स'),
  o('pharmacy', 'Pharmacy / medical store', 'दवा / मेडिकल स्टोर'),
  o('hardware', 'Hardware / sanitary', 'हार्डवेयर / सैनिटरी'),
  o('jewellery', 'Jewellery', 'ज्वैलरी'),
  o('coaching', 'Tuition / coaching', 'ट्यूशन / कोचिंग'),
  o('dairy', 'Dairy / bakery / food', 'डेयरी / बेकरी / खाना'),
  o('other', 'Other business', 'अन्य व्यापार'),
];

const MSME_QUESTIONS = [
  q('m1', 'single', 'Which business are you in?', 'आपका व्यापार कौन-सा है?', { options: BUSINESS_TYPES }),
  q('m2', 'single', 'How long has your business been running?', 'आपका व्यापार कितने साल से चल रहा है?', {
    options: [
      o('lt2', 'Under 2 years', '2 साल से कम'),
      o('2-5', '2–5 years', '2–5 साल'),
      o('5-10', '5–10 years', '5–10 साल'),
      o('gt10', 'More than 10 years', '10 साल से ज़्यादा'),
    ],
  }),
  q('m3', 'single', 'Where is your business located?', 'आपका व्यापार कहाँ है?', {
    options: [
      o('village', 'Village', 'गाँव'),
      o('town', 'Small town / kasba', 'छोटा शहर / क़स्बा'),
      o('city', 'City market', 'शहर का बाज़ार'),
      o('mall', 'Mall or high street', 'मॉल या मुख्य बाज़ार'),
    ],
  }),
  q('m4', 'single', 'How many customers come to you in a day?', 'रोज़ कितने ग्राहक आते हैं?', {
    options: [
      o('lt20', 'Under 20', '20 से कम'),
      o('20-50', '20–50', '20–50'),
      o('50-150', '50–150', '50–150'),
      o('gt150', 'More than 150', '150 से ज़्यादा'),
    ],
  }),
  q('m5', 'multi', 'How do you market today? (choose all)', 'आज मार्केटिंग कैसे करते हैं? (सभी चुनें)', {
    options: [
      o('none', 'I do not market at all', 'कोई मार्केटिंग नहीं करता'),
      o('status', 'WhatsApp status', 'व्हाट्सएप स्टेटस'),
      o('broadcast', 'WhatsApp broadcast to customers', 'ग्राहकों को व्हाट्सएप ब्रॉडकास्ट'),
      o('social', 'Facebook / Instagram', 'फ़ेसबुक / इंस्टाग्राम'),
      o('google', 'Google business listing', 'गूगल बिज़नेस लिस्टिंग'),
      o('print', 'Flyers, banners, pamphlets', 'पर्चे, बैनर, पैम्फ़लेट'),
      o('local', 'Local newspaper, cable, loudspeaker', 'स्थानीय अख़बार, केबल, लाउडस्पीकर'),
      o('influencer', 'Local influencer', 'स्थानीय इन्फ़्लुएंसर'),
    ],
  }),
  q('m6', 'single', 'How much do you spend on marketing in a month?', 'महीने में मार्केटिंग पर कितना ख़र्च करते हैं?', {
    options: [
      o('0', 'Nothing', 'कुछ नहीं'),
      o('lt1k', 'Under ₹1,000', '₹1,000 से कम'),
      o('1-3k', '₹1,000–3,000', '₹1,000–3,000'),
      o('3-10k', '₹3,000–10,000', '₹3,000–10,000'),
      o('gt10k', 'More than ₹10,000', '₹10,000 से ज़्यादा'),
    ],
  }),
  q('m7', 'single', 'How many customers are in your WhatsApp contact list?', 'व्हाट्सएप में कितने ग्राहक हैं?', {
    options: [
      o('lt100', 'Under 100', '100 से कम'),
      o('100-500', '100–500', '100–500'),
      o('500-2000', '500–2,000', '500–2,000'),
      o('gt2000', 'More than 2,000', '2,000 से ज़्यादा'),
    ],
  }),
  q('m8', 'single', 'How often do you send offers to customers?', 'ग्राहकों को ऑफ़र कितनी बार भेजते हैं?', {
    options: [
      o('weekly', 'Every week', 'हर हफ़्ते'),
      o('monthly', 'Every month', 'हर महीने'),
      o('festival', 'Only on festivals', 'सिर्फ़ त्योहारों पर'),
      o('rarely', 'Rarely', 'कभी-कभार'),
      o('never', 'Never', 'कभी नहीं'),
    ],
  }),
  q('m9', 'single', 'What stops you from marketing more?', 'ज़्यादा मार्केटिंग न करने की सबसे बड़ी वजह?', {
    options: [
      o('time', 'No time', 'समय नहीं'),
      o('ideas', 'Do not know what to post', 'समझ नहीं आता क्या डालें'),
      o('writing', 'Cannot write good copy', 'अच्छा मैसेज लिखना नहीं आता'),
      o('design', 'No designer for posters', 'पोस्टर बनाने वाला नहीं'),
      o('cost', 'It costs too much', 'ख़र्च ज़्यादा है'),
      o('results', 'It never brings results', 'नतीजा नहीं मिलता'),
    ],
  }),
  q('m10', 'single', 'How much time can you give to marketing each week?', 'हफ़्ते में मार्केटिंग को कितना समय दे सकते हैं?', {
    options: [
      o('lt15', 'Under 15 minutes', '15 मिनट से कम'),
      o('30', 'About 30 minutes', 'क़रीब 30 मिनट'),
      o('1-2h', '1–2 hours', '1–2 घंटे'),
      o('gt2h', 'More than 2 hours', '2 घंटे से ज़्यादा'),
    ],
  }),
  q('m11', 'single', 'Which content would help you most?', 'कौन-सा कंटेंट सबसे ज़्यादा काम आएगा?', {
    options: [
      o('poster', 'Offer poster for WhatsApp', 'व्हाट्सएप के लिए ऑफ़र पोस्टर'),
      o('message', 'Ready message in the customer’s language', 'ग्राहक की भाषा में तैयार मैसेज'),
      o('festival', 'Festival greetings', 'त्योहार की बधाई'),
      o('google', 'Google business posts', 'गूगल बिज़नेस पोस्ट'),
      o('reel', 'Short video / reel script', 'छोटा वीडियो / रील स्क्रिप्ट'),
      o('review', 'Replies to reviews', 'रिव्यू का जवाब'),
    ],
  }),
  q('m12', 'multi', 'Which languages do your customers speak? (choose all)', 'आपके ग्राहक कौन-सी भाषाएँ बोलते हैं? (सभी चुनें)', {
    options: [
      o('hi', 'Hindi', 'हिन्दी'),
      o('en', 'English', 'अंग्रेज़ी'),
      o('mr', 'Marathi', 'मराठी'),
      o('ta', 'Tamil', 'तमिल'),
      o('te', 'Telugu', 'तेलुगु'),
      o('bn', 'Bengali', 'बंगाली'),
      o('pa', 'Punjabi', 'पंजाबी'),
      o('gu', 'Gujarati', 'गुजराती'),
      o('kn', 'Kannada', 'कन्नड़'),
    ],
  }),
  q(
    'm13',
    'scale',
    'Would auto-generated posters with your shop name and prices help?',
    'दुकान के नाम और दाम वाले अपने-आप बने पोस्टर काम आएँगे?',
    {
      min: 1,
      max: 5,
      low: { en: 'Not at all', hi: 'बिल्कुल नहीं' },
      high: { en: 'Very much', hi: 'बहुत ज़्यादा' },
    }
  ),
  q('m14', 'single', 'How do you feel about AI-written content for your shop?', 'दुकान के लिए एआई से लिखा कंटेंट कैसा लगता है?', {
    options: [
      o('fine', 'Fine, if it sounds like me', 'ठीक है, अगर मेरी तरह लगे'),
      o('review', 'I would check it before sending', 'भेजने से पहले देख लूँगा'),
      o('trust', 'I do not trust it', 'भरोसा नहीं'),
    ],
  }),
  q('m15', 'single', 'Would you pay a monthly fee for automated local campaigns?', 'अपने-आप चलने वाले स्थानीय कैंपेन के लिए मासिक शुल्क देंगे?', {
    options: [
      o('yes', 'Yes', 'हाँ'),
      o('maybe', 'Maybe, after a free trial', 'शायद, मुफ़्त ट्रायल के बाद'),
      o('no', 'No', 'नहीं'),
    ],
  }),
  q('m16', 'single', 'What monthly price feels fair?', 'महीने का कितना शुल्क ठीक लगेगा?', {
    options: [
      o('lt199', 'Under ₹199', '₹199 से कम'),
      o('199-499', '₹199–499', '₹199–499'),
      o('499-999', '₹499–999', '₹499–999'),
      o('999-1999', '₹999–1,999', '₹999–1,999'),
      o('gt1999', 'More than ₹1,999', '₹1,999 से ज़्यादा'),
    ],
  }),
  q('m17', 'single', 'How would you like to receive the content?', 'कंटेंट कैसे मिलना पसंद है?', {
    options: [
      o('whatsapp', 'WhatsApp', 'व्हाट्सएप'),
      o('app', 'In an app', 'ऐप में'),
      o('print', 'Printed for the shop', 'दुकान के लिए छपा हुआ'),
      o('email', 'Email', 'ईमेल'),
    ],
  }),
  q('m18', 'single', 'Which result matters most?', 'सबसे ज़रूरी नतीजा क्या है?', {
    options: [
      o('footfall', 'More walk-in customers', 'ज़्यादा ग्राहक दुकान पर'),
      o('orders', 'More WhatsApp orders', 'ज़्यादा व्हाट्सएप ऑर्डर'),
      o('repeat', 'Repeat customers', 'दोबारा आने वाले ग्राहक'),
      o('recall', 'People remember my shop', 'लोगों को दुकान याद रहे'),
      o('reviews', 'More Google reviews', 'ज़्यादा गूगल रिव्यू'),
    ],
  }),
  q('m19', 'single', 'Who posts for your business today?', 'आज आपके व्यापार के लिए पोस्ट कौन करता है?', {
    options: [
      o('owner', 'I do it myself', 'मैं खुद करता/करती हूँ'),
      o('family', 'A family member', 'घर का कोई सदस्य'),
      o('staff', 'A staff member', 'कोई कर्मचारी'),
      o('agency', 'A paid agency', 'पैसे देकर एजेंसी'),
      o('none', 'Nobody', 'कोई नहीं'),
    ],
  }),
  q('m20', 'single', 'What worries you most about automated marketing?', 'अपने-आप चलने वाली मार्केटिंग में सबसे बड़ी चिंता?', {
    options: [
      o('tone', 'Wrong language or tone', 'ग़लत भाषा या लहजा'),
      o('spam', 'Customers will call it spam', 'ग्राहक स्पैम कहेंगे'),
      o('privacy', 'Customer data privacy', 'ग्राहक डेटा की निजता'),
      o('money', 'Money wasted on no results', 'बिना नतीजे पैसा बर्बाद'),
      o('none', 'Nothing', 'कोई चिंता नहीं'),
    ],
  }),
];

/* ------------------------------------------------------------------ */

export const CONSENT = {
  en: 'I agree that my answers may be used to improve this service. / मैं सहमत हूँ कि मेरे जवाब सेवा सुधारने के लिए इस्तेमाल किए जा सकते हैं।',
  hi: '',
};

export const SURVEYS = [
  {
    id: 'kisansetu',
    name: { en: 'KisanSetu', hi: 'किसानसेतु' },
    idea: {
      en: 'A farmer-to-buyer platform: farmers list produce, verified buyers order, pickup and payment happen in one place.',
      hi: 'किसान से खरीदार तक का प्लेटफ़ॉर्म: किसान फ़सल लिस्ट करते हैं, सत्यापित खरीदार ऑर्डर करते हैं, उठान और भुगतान एक ही जगह।',
    },
    accent: '#15803d',
    emoji: '🌾',
    roles: [
      {
        id: 'farmer',
        name: { en: 'Farmer', hi: 'किसान' },
        intro: {
          en: 'For farmers and growers. 20 questions, about 5 minutes.',
          hi: 'किसानों के लिए। 20 सवाल, क़रीब 5 मिनट।',
        },
        profile: [
          { id: 'name', en: 'Your name', hi: 'आपका नाम', type: 'text' },
          { id: 'phone', en: 'Mobile number', hi: 'मोबाइल नंबर', type: 'tel' },
          { id: 'place', en: 'Village / block / district', hi: 'गाँव / ब्लॉक / ज़िला', type: 'text' },
        ],
        questions: FARMER_QUESTIONS,
      },
      {
        id: 'buyer',
        name: { en: 'Buyer', hi: 'खरीदार' },
        intro: {
          en: 'For shops, restaurants, wholesalers and processors. 20 questions, about 5 minutes.',
          hi: 'दुकान, रेस्टोरेंट, थोक व्यापारी और प्रोसेसर के लिए। 20 सवाल, क़रीब 5 मिनट।',
        },
        profile: [
          { id: 'name', en: 'Your name', hi: 'आपका नाम', type: 'text' },
          { id: 'phone', en: 'Mobile number', hi: 'मोबाइल नंबर', type: 'tel' },
          { id: 'place', en: 'Shop / firm name and town', hi: 'दुकान / फ़र्म का नाम और शहर', type: 'text' },
        ],
        questions: BUYER_QUESTIONS,
      },
    ],
  },
  {
    id: 'kiranasetu',
    name: { en: 'KiranaSetu', hi: 'किरानासेतु' },
    idea: {
      en: 'Village kirana and paan shops order from town wholesalers, who deliver to the shop door on a fixed route.',
      hi: 'गाँव की किराना और पान की दुकानें क़स्बे के थोक व्यापारियों से ऑर्डर करती हैं, और तय रूट पर दुकान तक माल पहुँचता है।',
    },
    accent: '#b45309',
    emoji: '🛒',
    roles: [
      {
        id: 'kirana',
        name: { en: 'Kirana / paan shop', hi: 'किराना / पान दुकान' },
        intro: {
          en: 'For village shopkeepers. 20 questions, about 4 minutes.',
          hi: 'गाँव के दुकानदारों के लिए। 20 सवाल, क़रीब 4 मिनट।',
        },
        profile: [
          { id: 'name', en: 'Your name', hi: 'आपका नाम', type: 'text' },
          { id: 'phone', en: 'Mobile number', hi: 'मोबाइल नंबर', type: 'tel' },
          { id: 'place', en: 'Shop name, village / town', hi: 'दुकान का नाम, गाँव / क़स्बा', type: 'text' },
        ],
        questions: KIRANA_QUESTIONS,
      },
      {
        id: 'wholesaler',
        name: { en: 'Wholesaler', hi: 'थोक व्यापारी' },
        intro: {
          en: 'For distributors and wholesalers. 20 questions, about 4 minutes.',
          hi: 'डिस्ट्रीब्यूटर और थोक व्यापारियों के लिए। 20 सवाल, क़रीब 4 मिनट।',
        },
        profile: [
          { id: 'name', en: 'Your name', hi: 'आपका नाम', type: 'text' },
          { id: 'phone', en: 'Mobile number', hi: 'मोबाइल नंबर', type: 'tel' },
          { id: 'place', en: 'Firm name and town', hi: 'फ़र्म का नाम और शहर', type: 'text' },
        ],
        questions: WHOLESALER_QUESTIONS,
      },
    ],
  },
  {
    id: 'nukkad',
    name: { en: 'Nukkad', hi: 'नुक्कड़' },
    idea: {
      en: 'Localized marketing automation: pick an offer, and the shop gets a poster, WhatsApp message and Google post in the customer’s language.',
      hi: 'स्थानीय भाषा में मार्केटिंग ऑटोमेशन: ऑफ़र चुनिए, दुकान को ग्राहक की भाषा में पोस्टर, व्हाट्सएप मैसेज और गूगल पोस्ट मिल जाता है।',
    },
    accent: '#7c3aed',
    emoji: '📣',
    roles: [
      {
        id: 'msme',
        name: { en: 'Local business / MSME', hi: 'स्थानीय व्यापार / एमएसएमई' },
        intro: {
          en: 'For ten kinds of local businesses. 20 questions, about 4 minutes.',
          hi: 'दस तरह के स्थानीय व्यापारों के लिए। 20 सवाल, क़रीब 4 मिनट।',
        },
        profile: [
          { id: 'name', en: 'Your name', hi: 'आपका नाम', type: 'text' },
          { id: 'phone', en: 'Mobile / WhatsApp number', hi: 'मोबाइल / व्हाट्सएप नंबर', type: 'tel' },
          { id: 'place', en: 'Business name and area', hi: 'व्यापार का नाम और इलाक़ा', type: 'text' },
        ],
        questions: MSME_QUESTIONS,
      },
    ],
  },
];

export const getSurvey = (id) => SURVEYS.find((s) => s.id === id);
