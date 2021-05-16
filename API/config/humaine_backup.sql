--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cases (
    id integer NOT NULL,
    case_name character varying(255) NOT NULL,
    case_description text,
    case_status character varying(15),
    case_difficulty character varying(15),
    case_created timestamp with time zone DEFAULT timezone('UTC'::text, CURRENT_TIMESTAMP),
    image text,
    case_department text
);


ALTER TABLE public.cases OWNER TO postgres;

--
-- Name: cases_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cases ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user_cases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_cases (
    id integer NOT NULL,
    case_id integer,
    user_id integer,
    status text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    stopped_at timestamp without time zone
);


ALTER TABLE public.user_cases OWNER TO postgres;

--
-- Name: user_cases_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.user_cases ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_cases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    title text,
    institution text,
    level_of_training text,
    gender text,
    country text,
    date_of_birth date,
    status integer DEFAULT 0
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_cases_diagnosis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_cases_diagnosis (
    id integer NOT NULL,
    user_id integer,
    case_id integer,
    diagnosis text NOT NULL
);


ALTER TABLE public.users_cases_diagnosis OWNER TO postgres;

--
-- Name: users_cases_diagnosis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_cases_diagnosis ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_cases_diagnosis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_cases_intents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_cases_intents (
    id integer NOT NULL,
    user_id integer,
    case_id integer,
    intent json
);


ALTER TABLE public.users_cases_intents OWNER TO postgres;

--
-- Name: users_cases_intents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_cases_intents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_cases_intents_id_seq OWNER TO postgres;

--
-- Name: users_cases_intents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_cases_intents_id_seq OWNED BY public.users_cases_intents.id;


--
-- Name: users_cases_notes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_cases_notes (
    id integer NOT NULL,
    user_id integer,
    case_id integer,
    note text NOT NULL
);


ALTER TABLE public.users_cases_notes OWNER TO postgres;

--
-- Name: users_cases_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_cases_notes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_cases_notes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_cases_support; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_cases_support (
    id integer NOT NULL,
    user_id integer,
    case_id integer,
    comment text NOT NULL,
    is_flagged boolean,
    comment_created timestamp without time zone DEFAULT timezone('UTC'::text, CURRENT_TIMESTAMP),
    session_id integer NOT NULL,
    intent text
);


ALTER TABLE public.users_cases_support OWNER TO postgres;

--
-- Name: users_cases_support_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_cases_support ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_cases_support_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_cases_intents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_intents ALTER COLUMN id SET DEFAULT nextval('public.users_cases_intents_id_seq'::regclass);


--
-- Data for Name: cases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cases (id, case_name, case_description, case_status, case_difficulty, case_created, image, case_department) FROM stdin;
5	Mr.Robin Williams	Goku has a sever knee pain, which comes and goes. As a doctor figure out the cause of the pain and perscribe appropriate druges	active	Easy	2020-12-02 10:07:08.9764+05:30	default.jpg	Gastroenterologist
6	Mr. Leonardo	Naruto has a sever knee pain, which comes and goes. As a doctor figure out the cause of the pain and perscribe appropriate druges	active	Difficult	2020-12-02 10:07:08.9764+05:30	default.jpg	Gastroenterologist
7	Mrs. Katy Perry	Sasuke has a sever knee pain, which comes and goes. As a doctor figure out the cause of the pain and perscribe appropriate druges	active	Moderate	2020-12-02 10:07:08.9764+05:30	default.jpg	Gastroenterologist
8	Mr. Abraham Lincoln	Saitama has a sever knee pain, which comes and goes. As a doctor figure out the cause of the pain and perscribe appropriate druges	active	Easy	2020-12-02 10:07:08.9764+05:30	default.jpg	Gastroenterologist
\.


--
-- Data for Name: user_cases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_cases (id, case_id, user_id, status, created_at, stopped_at) FROM stdin;
4	6	16	in_progress	2021-01-14 00:15:54.671324	\N
12	8	16	in_progress	2021-01-17 03:20:50.817577	\N
1	5	16	attempted	2021-01-13 23:21:06.944798	2021-01-17 03:30:39.402538
2	5	16	attempted	2021-01-13 23:21:06.944798	2021-01-17 03:30:39.402538
3	5	16	in_progress	2021-01-14 00:15:37.119003	\N
14	6	0	in_progress	2021-04-27 16:32:19.731201	\N
15	7	0	in_progress	2021-04-28 10:45:05.835372	\N
16	8	0	in_progress	2021-04-28 10:45:17.03491	\N
17	5	0	in_progress	2021-04-28 10:49:25.161506	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, title, institution, level_of_training, gender, country, date_of_birth, status) FROM stdin;
16	ammaryousaf@gmail.com	97706622cc4131a8e4e2fbcd77eafc52	Ammar Yousaf	Mr	Fedral	alright	male	UK	2020-03-03	1
0	humainenlp@gmail.com	641fcbb54be26270abb2b91c7e795317	Humaine	Mr	Humaine.co	\N	male	UK	1993-03-18	1
18	ammaryousaf123@gmail.com	c90c8d775a8f601d38c42192c8f70020	Ammar Yousaf	\N	\N	\N	\N	\N	\N	0
19	saivicky2015@gmail.com	d6b0ab7f1c8ab8f514db9a6d85de160a	Vikranth Reddy	Mr	VIT	\N	M	India	1999-02-01	0
20	ds@gmail.com	9a361ed860ec2617da5af72079594a21	Vikranth Reddy	Mr	a	\N	M	India	2311-03-12	0
22	saivicky201775@gmail.com	9a361ed860ec2617da5af72079594a21	Vikranth Reddy	Mr	VIT	\N	M	India	4535-03-31	0
23	humainenlwwp@gmail.com	d6b0ab7f1c8ab8f514db9a6d85de160a	asd	Mr	VIT	\N	M	Bahrain	4567-04-23	0
24	humainenlwwwwwp@gmail.com	d6b0ab7f1c8ab8f514db9a6d85de160a	asd	Mr	VIT	PCMS	M	Bahrain	4567-04-23	0
25	humainessssssssnlp@gmail.com	25d55ad283aa400af464c76d713c07ad	asd	Mrs	VIT		M	Afghanistan	4444-04-01	0
26	hum2ainenlp@gmail.com	d6b0ab7f1c8ab8f514db9a6d85de160a	Vikranth Reddy	Mr	VIT		M	India	2222-02-22	0
27	humassssxxxinenlp@gmail.com	9a361ed860ec2617da5af72079594a21	Vikranth Reddy	Mr					2222-02-22	0
28	humassssxxxinsenlp@gmail.com	9a361ed860ec2617da5af72079594a21	Vikranth Reddy	Mr	a				2222-02-22	0
29	ankit.kapoor@uts.edu.au	978e22b4e5a9bedf3668a440c6d7e7cd	Saleem Javid	Mrs				India	1222-12-12	0
30	anit.kapoor@uts.edu.au	978e22b4e5a9bedf3668a440c6d7e7cd	Vikranth Reddy	Mr	VIT	Final Year Medical Student		India	1221-12-12	0
31	an111kit.kapoor@uts.edu.au	d27547a7d9ba8a36283bc72d2c3a4a04	Vikranth Reddy	Mrs	VIT	Pre-clinical Medical Student	M	India	1212-12-12	0
32	an111kit.kapoor@edu.a	d27547a7d9ba8a36283bc72d2c3a4a04	Vikranth Reddy	Mrs	VIT	Pre-clinical Medical Student	M	India	1212-12-12	0
\.


--
-- Data for Name: users_cases_diagnosis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_cases_diagnosis (id, user_id, case_id, diagnosis) FROM stdin;
16	16	5	ABC
\.


--
-- Data for Name: users_cases_intents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_cases_intents (id, user_id, case_id, intent) FROM stdin;
3	0	6	{"ADLs":0,"Followup":"WhatProblem","AbdoCramps":0,"AbdoDistention":0,"AbdoPain":0,"Accommodation":0,"Age":0,"Alcohol":0,"AllergyHx":0,"AnimalAllergy":0,"AntiSickness":0,"Appendicectomy":0,"Appetite":0,"AsbestosExposure":0,"Ascites":0,"AssociatedFactors":0,"AssociatedFactorsPast":0,"BarleyExposure":0,"BeeWaspStingAllergy":0,"BerylliumExposure":0,"BirdAllergy":0,"Bloatedness":0,"BloodyStool":0,"BowelFrequency":0,"BowelHabit":0,"BowelIncontinence":0,"BowelMotions":0,"CasualPartner":0,"CheckDrug":0,"Character":0,"ChestPain":0,"Cholecystectomy":0,"CoalExposure":0,"ColdWeatherExacerbation":0,"Colonoscopy":0,"Concern":0,"ConfirmName":0,"ConfirmProblem":0,"Constipation":0,"Contacts":0,"CottonExposure":0,"Cough":0,"DIabetes":0,"DOB":0,"DampHome":0,"DarkUrine":0,"Delivery":0,"Diarrhea":0,"Diet":0,"DiagnosticStatement":0,"Diarrhoea":0,"DoctorQuestion":0,"DrugAbuse":0,"DrugHx":0,"DustExposure":0,"Dyspepsia":0,"Dysphagia":0,"EggAllergy":0,"Empathy":0,"EnvironmentChangeHouse":0,"ExacerbatingFactors":0,"Exercise":0,"ExerciseToleranceNorm":0,"ExerciseToleranceNow":0,"Expectations":0,"FamilyHx":0,"FamilyMember":0,"FarmingExposure":0,"Fever":0,"FoodAllergy":0,"Frequency":0,"FrequencyUrine":0,"GORD":0,"Gastritis":0,"Goodbye":0,"Haematemesis":0,"Haemoptysis":0,"HaemoptysisMixedStreak":0,"Hayfever":0,"Heart attack":0,"HerniaOp":0,"HiatusHernia":0,"Hoarseness":0,"Hobbies":0,"Ideas":0,"IVDU":0,"IndustrialExposure":0,"IntroAndName":0,"Introduction":7,"ItchyEyesNoseThroat":0,"Jaundice":0,"LUTOpen":0,"Lethargy":0,"Lifestyle":0,"ManagementPlan":0,"MushroomExposure":0,"Name":0,"NameAndDOB ":0,"NameAndAge":0,"Nausea":0,"NeuroSOB":0,"NewWorkConditions":0,"NewLivingConditions":0,"Nocturia":0,"NutsAllergy":0,"OGD":0,"OTCDrugHx":0,"Occupation":0,"Odynophagia":0,"Onset":0,"OnsetTrigger":0,"Orthopnoea":0,"OtherProblems":0,"PND":0,"PUD":0,"PainKiller":0,"PainfulDefecation":0,"PaleStool":0,"Partner":0,"PassiveSmoke":0,"PassiveSmokeContact":0,"PastMedicalHx":0,"PastSurgicalHx":0,"PeripheralOedema":0,"PetsExposure":0,"Piles":0,"PillowsSleep":0,"PollenAllergy":0,"PreviousICU":0,"PreviousTransfusions":0,"ProblemBefore":0,"ProblemProgression":0,"ProblemStart":0,"PrutitisAni":0,"PrutitisSkin":0,"ProblemStartPast":0,"PruritisAni":0,"PruritisSkin":0,"Radiation":0,"RadiationPast":0,"Reassurance":0,"RecentTreatment":0,"RegularPartner":0,"RelievingFactors":0,"Rhinitis":0,"SOB":0,"SOBWork":0,"SafeSex":0,"SeafoodAllergy":0,"SeasonVariation":0,"Severity":0,"SexType":0,"Site":0,"SitePast":0,"SkinChange":0,"SmallTalk":1,"Smoke":0,"Sleep":0,"Sneezing":0,"SOBExert":0,"SOBExertion":0,"SOBVariation":0,"Sputum":0,"SputumAmount":0,"SputumColour":0,"StoolBulk":0,"StoolConsistency":0,"StoolDescribe":0,"StoolFloat":0,"StoolMucus":0,"StoolSmell":0,"StressIncontinence":0,"Summary":0,"SurgeryPast":0,"Sweating":0,"Tenesmus":0,"TermDelivery":0,"Timing":0,"TimingPast":0,"TransitionPoints":0,"TravelHx":0,"Urgency":0,"Vomit":0,"WeightLoss":0,"WhatProblem":11,"Wheeze":0,"WheezeWork":0,"ask_rephrase":0,"backtrack":0,"default":0,"Palpitations":0,"PillowSleep":0,"MasonryExposure":0,"ConstructionExposure":0,"CeramicsExposure":0,"Arrhythmia":0,"Anxiety":0,"Stress":0,"chitchat":null}
\.


--
-- Data for Name: users_cases_notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_cases_notes (id, user_id, case_id, note) FROM stdin;
1	16	6	Hi there dude
2	16	7	Just writing a note here dude. nothing else
3	16	7	Just writing a note here dude. nothing else
4	0	5	Random Notes\n
5	0	7	This bot aint working\n
\.


--
-- Data for Name: users_cases_support; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_cases_support (id, user_id, case_id, comment, is_flagged, comment_created, session_id, intent) FROM stdin;
25	16	6	Hi there dude	f	2021-01-16 22:57:27.814603	3	
26	0	6	 Hello Doctor. Nice to meet you.	f	2021-01-16 22:57:30.131645	3	Introduction
27	16	6	I need medicine	f	2021-01-16 22:57:48.771805	3	
28	0	6	 Thank you for your kind words doctor.	f	2021-01-16 22:57:51.319294	3	Empathy
29	16	6	I need medicine	f	2021-01-16 23:01:07.674869	3	
30	0	6	 Thank you for your kind words doctor.	f	2021-01-16 23:01:10.346278	3	Empathy
217	0	6	x	f	2021-05-15 13:50:10.398465	14	
218	0	6	I am okay doctor, just my legs bothering me	f	2021-05-15 13:50:12.067284	14	SmallTalk
219	0	6	a	f	2021-05-15 13:52:23.150662	14	
220	0	6	I am not able to understand your question!	f	2021-05-15 13:52:24.455274	14	NA
221	0	6	what is the problem	f	2021-05-15 13:52:37.192434	14	
222	0	6	My legs have been just really swollen for a few weeks now. It has me a little worried	f	2021-05-15 13:52:38.770962	14	WhatProblem
31	0	6	hello	f	2021-04-27 15:28:10.736228	14	
32	0	6	Good morning doctor	f	2021-04-27 15:28:12.781743	14	Introduction
33	0	6	hello	f	2021-04-27 15:28:59.711033	14	
34	0	6	Hello	f	2021-04-27 15:29:01.04821	14	Introduction
35	0	6	good morning	f	2021-04-27 15:29:09.490984	14	
36	0	6	Good morning doctor	f	2021-04-27 15:29:11.050384	14	Introduction
37	0	6	how are you feeling	f	2021-04-27 15:29:19.368186	14	
38	0	6	I am okay doctor, just my legs bothering me	f	2021-04-27 15:29:21.018269	14	SmallTalk
39	0	6	what's wrong with	f	2021-04-27 15:29:28.360263	14	
40	0	6	Once a day	f	2021-04-27 15:29:29.831866	14	BowelHabit
41	0	6	what's wrong with your legs	f	2021-04-27 15:29:36.580663	14	
42	0	6	what's wrong with your legs	f	2021-04-27 15:29:36.766805	14	
43	0	6	what's wrong with your legs	f	2021-04-27 15:29:36.796363	14	
44	0	6	Once a day	f	2021-04-27 15:29:38.199171	14	BowelHabit
45	0	6	Once a day	f	2021-04-27 15:29:39.232342	14	BowelHabit
46	0	6	Once a day	f	2021-04-27 15:29:44.907826	14	BowelHabit
47	0	6	you idiotic ai, me need u to pay monrey honey	f	2021-04-28 05:26:04.531139	14	
48	0	7	hello	f	2021-04-28 05:26:50.730325	15	
49	0	7	hello	f	2021-04-28 05:32:37.733059	15	
50	0	7	hello	f	2021-04-28 05:33:18.839169	15	
51	0	5	this is not workling well	f	2021-04-28 07:33:01.234393	17	
52	0	5	checking	f	2021-04-28 08:00:14.599318	17	
53	0	5	checking again	f	2021-04-28 08:00:56.977783	17	
54	0	5	hello	f	2021-04-28 09:22:34.977744	17	
55	0	7	hello	f	2021-04-28 09:23:37.155543	15	
56	0	7	 Hello Doctor. Nice to meet you.	f	2021-04-28 09:23:39.184974	15	Introduction
57	0	6	 Hello bot, are you having any symptoms of akash disease	f	2021-04-28 09:26:08.489552	15	
58	0	6	 No, not that I have noted.	f	2021-04-28 09:26:09.768981	15	SeasonVariation
59	0	5	Hello bot, are you having any symptoms of akash disease	f	2021-04-28 09:26:29.159195	14	
60	0	5	 No, not that I have noted.	f	2021-04-28 09:26:30.578602	14	SeasonVariation
61	0	7	hello	f	2021-04-29 11:29:40.121524	15	
62	0	7	Hello doctor	f	2021-04-29 11:29:42.16959	15	Introduction
63	0	7	Hello, Doctor	f	2021-04-29 11:31:54.116795	15	
64	0	7	Good morning doctor	f	2021-04-29 11:31:55.297153	15	Introduction
65	0	7	hello katty, how are you doing today	f	2021-04-29 11:35:24.580125	15	
66	0	7	I am okay doctor, just my legs bothering me	f	2021-04-29 11:35:26.029438	15	SmallTalk
67	0	7	Whats wrong	f	2021-04-29 11:35:37.231836	15	
68	0	7	 I am 65 years old.	f	2021-04-29 11:35:38.688937	15	Age
69	0	6	hay	f	2021-04-29 13:39:23.71117	14	
70	0	6	Yes it's been hard	f	2021-04-29 13:39:24.900377	14	Empathy
71	0	6	hello	f	2021-04-29 14:24:10.550991	14	
72	0	6	Hello	f	2021-04-29 14:24:11.758695	14	Introduction
73	0	5	hello 	f	2021-04-29 14:30:56.656847	17	
74	0	5	Hello doctor	f	2021-04-29 14:30:57.905736	17	Introduction
75	0	5	hello, what are u doing	f	2021-04-29 14:32:11.112985	17	
76	0	5	Third of January, 1965	f	2021-04-29 14:32:12.624165	17	DOB
77	0	5	hello	f	2021-04-29 14:35:32.28785	17	
78	0	5	Good morning doctor	f	2021-04-29 14:35:33.694606	17	Introduction
79	0	5	hello	f	2021-04-29 14:37:18.581779	17	
80	0	5	Hello doctor	f	2021-04-29 14:37:20.149746	17	Introduction
81	0	5	Huawei	f	2021-04-29 14:37:39.909377	17	
82	0	5	I am not able to understand your question!	f	2021-04-29 14:37:41.284472	17	NA
83	0	6	hay	f	2021-05-01 04:10:06.169102	14	
84	0	6	Yes it's been hard	f	2021-05-01 04:10:08.115269	14	Empathy
85	0	6	a	f	2021-05-03 08:40:23.168189	14	
86	0	6	I am not able to understand your question!	f	2021-05-03 08:40:25.212471	14	NA
87	0	6	a	f	2021-05-03 08:40:50.652662	14	
88	0	6	I am not able to understand your question!	f	2021-05-03 08:40:51.879761	14	NA
89	0	6	Why is this still working	f	2021-05-03 08:40:58.609142	14	
90	0	6	 No	f	2021-05-03 08:41:01.845486	14	SOBWork
91	0	6	x	f	2021-05-03 08:49:51.387086	14	
92	0	6	I am okay doctor, just my legs bothering me	f	2021-05-03 08:49:53.016921	14	SmallTalk
93	0	5	hello	f	2021-05-03 13:09:53.059633	15	
94	0	5	Hello doctor	f	2021-05-03 13:09:54.343215	15	Introduction
95	0	6	hello Mr	f	2021-05-04 09:52:50.65056	14	
96	0	6	Good morning doctor	f	2021-05-04 09:52:52.655733	14	Introduction
97	0	6	nm	f	2021-05-04 09:53:00.892884	14	
98	0	6	Amjad Khan	f	2021-05-04 09:53:02.23323	14	Name
99	0	6	hello	f	2021-05-10 11:08:30.349973	14	
100	0	6	Hello	f	2021-05-10 11:08:32.281471	14	Introduction
101	0	6	hello	f	2021-05-10 11:10:08.256506	14	
102	0	6	Good morning doctor	f	2021-05-10 11:10:09.661902	14	Introduction
103	0	6	hello	f	2021-05-10 11:10:13.575521	14	
104	0	6	Hello doctor	f	2021-05-10 11:10:15.174764	14	Introduction
105	0	6	hello	f	2021-05-10 11:10:19.441556	14	
106	0	6	Hello	f	2021-05-10 11:10:21.074936	14	Introduction
107	0	6	what is the problem	f	2021-05-10 11:10:33.3068	14	
108	0	6	 I have noticed my legs have become quite swollen	f	2021-05-10 11:10:34.90878	14	WhatProblem
109	0	6	 what is the problem	f	2021-05-10 11:10:42.0239	14	
110	0	6	 I have noticed my legs have become quite swollen	f	2021-05-10 11:10:43.569229	14	WhatProblem
111	0	6	 what is the problem	f	2021-05-10 11:10:46.508586	14	
112	0	6	 I have noticed my legs have become quite swollen	f	2021-05-10 11:10:48.10907	14	WhatProblem
113	0	6	can you explain	f	2021-05-10 11:10:59.966156	14	
114	0	6	I am okay doctor, just my legs bothering me	f	2021-05-10 11:11:01.676153	14	SmallTalk
115	0	6	 can you explain more	f	2021-05-10 11:11:12.010682	14	
116	0	6	I am not able to understand your question!	f	2021-05-10 11:11:13.824389	14	NA
117	0	6	can you explain more on what's wrong with your legs	f	2021-05-10 11:11:31.408728	14	
118	0	6	Normally, I can walk a few miles but now I can maybe manage 20 yards	f	2021-05-10 11:11:33.57448	14	ExerciseToleranceNorm
119	0	6	hello	f	2021-05-10 11:15:10.58636	14	
120	0	6	Good morning doctor	f	2021-05-10 11:15:12.499877	14	Introduction
121	0	6	hello	f	2021-05-10 11:20:06.16744	14	
122	0	6	hello	f	2021-05-10 11:20:46.455345	14	
123	0	6	Hello doctor	f	2021-05-10 11:20:48.209751	14	Introduction
124	0	6	hello	f	2021-05-10 11:21:07.496394	14	
125	0	6	Hello	f	2021-05-10 11:21:09.36311	14	Introduction
126	0	6	hello	f	2021-05-10 11:21:32.668186	14	
127	0	6	Hello doctor	f	2021-05-10 11:21:34.547148	14	Introduction
128	0	6	hello	f	2021-05-11 04:35:02.9199	14	
129	0	7	 Hello 	f	2021-05-11 04:36:41.747001	15	
130	0	6	hello	f	2021-05-11 04:38:05.36409	14	
131	0	6	Good morning doctor	f	2021-05-11 04:38:21.618636	14	Introduction
132	0	6	hello	f	2021-05-11 04:38:46.160873	14	
133	0	6	Hello doctor	f	2021-05-11 04:39:08.71923	14	Introduction
134	0	6	hello	f	2021-05-11 04:40:29.79786	14	
135	0	6	Hello doctor	f	2021-05-11 04:40:54.745395	14	Introduction
136	0	6	hello	f	2021-05-11 09:16:22.543795	14	
137	0	6	hello	f	2021-05-11 09:18:44.796522	14	
138	0	6	hello	f	2021-05-11 09:19:45.737563	14	
139	0	6	hello	f	2021-05-11 09:20:26.243285	14	
140	0	6	hello	f	2021-05-11 09:20:47.595516	14	
141	0	6	hello	f	2021-05-11 09:21:10.99102	14	
142	0	6	hello	f	2021-05-11 09:22:19.057912	14	
143	0	6	hello	f	2021-05-11 09:22:50.346951	14	
144	0	6	hello	f	2021-05-11 09:23:28.356611	14	
145	0	6	hello	f	2021-05-11 09:24:12.455928	14	
146	0	6	hello	f	2021-05-11 09:26:05.205497	14	
147	0	6	hello	f	2021-05-11 09:31:24.5512	14	
148	0	6	hello	f	2021-05-11 09:32:19.394073	14	
149	0	6	hello	f	2021-05-11 09:32:44.986207	14	
150	0	6	hello	f	2021-05-11 09:33:22.213391	14	
151	0	6	hello	f	2021-05-11 09:34:28.475116	14	
152	0	6	hello	f	2021-05-11 09:35:13.426231	14	
153	0	6	hello	f	2021-05-11 09:37:34.911985	14	
154	0	6	hello	f	2021-05-11 09:37:53.34413	14	
155	0	6	hello	f	2021-05-11 09:38:52.952488	14	
156	0	6	hello	f	2021-05-11 09:39:34.231956	14	
157	0	6	hello	f	2021-05-11 09:40:01.879422	14	
158	0	6	hello	f	2021-05-11 10:04:06.363544	14	
159	0	6	Good morning doctor	f	2021-05-11 10:04:08.263765	14	Introduction
160	0	6	hello	f	2021-05-11 10:23:08.626195	14	
161	0	6	Hello doctor	f	2021-05-11 10:23:10.381511	14	Introduction
162	0	6	hello	f	2021-05-11 10:23:34.996583	14	
163	0	6	Hello	f	2021-05-11 10:23:36.78717	14	Introduction
164	0	6	hello	f	2021-05-11 10:24:26.220858	14	
165	0	6	Good morning doctor	f	2021-05-11 10:24:29.063592	14	Introduction
166	0	6	hello	f	2021-05-11 10:44:24.018615	14	
167	0	6	Hello doctor	f	2021-05-11 10:44:25.670867	14	Introduction
168	0	6	hello	f	2021-05-11 10:48:12.542053	14	
169	0	6	Hello	f	2021-05-11 10:48:14.400072	14	Introduction
170	0	6	hello	f	2021-05-11 10:48:57.062687	14	
171	0	6	Good morning doctor	f	2021-05-11 10:48:58.747996	14	Introduction
172	0	6	hello	f	2021-05-11 10:57:58.025065	14	
173	0	6	Hello	f	2021-05-11 10:58:03.154482	14	Introduction
174	0	6	hello	f	2021-05-12 05:19:48.323699	14	
175	0	6	hello	f	2021-05-12 05:22:02.54635	14	
176	0	6	hello	f	2021-05-12 05:31:09.705771	14	
177	0	6	hello	f	2021-05-12 05:32:21.04028	14	
178	0	6	hello	f	2021-05-12 05:33:31.070583	14	
179	0	6	hello.	f	2021-05-12 05:38:57.328831	14	
180	0	6	hello	f	2021-05-12 05:39:25.534582	14	
181	0	6	hello	f	2021-05-12 05:41:09.522897	14	
182	0	6	hello	f	2021-05-12 05:45:22.22912	14	
183	0	6	hello	f	2021-05-12 05:52:52.924688	14	
184	0	6	hello	f	2021-05-12 07:26:03.88009	14	
185	0	6	hello	f	2021-05-12 07:27:08.50383	14	
186	0	6	hello	f	2021-05-12 07:27:55.700415	14	
187	0	6	hello	f	2021-05-12 07:29:04.76934	14	
188	0	6	hello	f	2021-05-12 07:30:01.63464	14	
189	0	6	hello	f	2021-05-12 07:31:00.205916	14	
190	0	6	hello	f	2021-05-12 07:32:41.580105	14	
191	0	6	hello	f	2021-05-12 07:34:12.859857	14	
192	0	6	hello	f	2021-05-12 07:36:16.211003	14	
193	0	6	hello	f	2021-05-12 07:37:28.964736	14	
194	0	6	hello	f	2021-05-12 07:39:39.322155	14	
195	0	6	hello	f	2021-05-12 07:40:19.414983	14	
196	0	6	hello	f	2021-05-12 07:41:33.653848	14	
197	0	6	hello	f	2021-05-12 07:47:34.917932	14	
198	0	6	hello	f	2021-05-12 07:47:50.818031	14	
199	0	6	hello	f	2021-05-12 07:48:23.867787	14	
200	0	6	hello	f	2021-05-12 07:49:04.096081	14	
201	0	6	hello	f	2021-05-12 07:52:54.053677	14	
202	0	6	hello	f	2021-05-12 07:53:31.305329	14	
203	0	6	hello	f	2021-05-12 07:54:25.405405	14	
204	0	6	hello	f	2021-05-12 08:58:00.35462	14	
205	0	6	hello	f	2021-05-12 08:58:57.598775	14	
206	0	6	hello	f	2021-05-12 08:59:26.515267	14	
207	0	6	hello	f	2021-05-12 10:19:27.992537	14	
208	0	6	hello	f	2021-05-12 10:29:38.84719	14	
209	0	6	hello	f	2021-05-12 10:31:46.303473	14	
210	0	6	hello	f	2021-05-12 10:39:37.758757	14	
211	0	6	hello	f	2021-05-12 10:41:40.749863	14	
212	0	6	Good morning doctor	f	2021-05-12 10:41:57.635361	14	Introduction
213	0	6	hello	f	2021-05-12 10:42:07.686432	14	
214	0	6	Hello doctor	f	2021-05-12 10:42:13.439285	14	Introduction
215	0	6	hello	f	2021-05-12 10:42:16.992122	14	
216	0	6	Hello	f	2021-05-12 10:42:19.231235	14	Introduction
223	0	6	what is the problem	f	2021-05-15 13:57:59.723151	14	
224	0	6	 I have noticed my legs have become quite swollen	f	2021-05-15 13:58:01.411285	14	WhatProblem
225	0	6	can you explain more	f	2021-05-15 13:58:14.886497	14	
226	0	6	can you explain more	f	2021-05-15 14:04:04.879526	14	
227	0	6	what is your problem	f	2021-05-15 14:11:53.66582	17	
228	0	6	My legs have been just really swollen for a few weeks now. It has me a little worried	f	2021-05-15 14:11:55.062735	17	WhatProblem
229	0	6	can you explain more	f	2021-05-15 14:13:18.348599	17	
230	0	6	can you explain more	f	2021-05-15 14:16:06.201029	14	
231	0	6	can you explain more	f	2021-05-15 14:19:31.843187	14	
232	0	6	 I have noticed my legs have become quite swollen	f	2021-05-15 14:19:33.190759	14	WhatProblem
233	0	6	can you tell me about your problem	f	2021-05-15 14:20:10.192818	14	
234	0	6	My legs have been just really swollen for a few weeks now. It has me a little worried	f	2021-05-15 14:20:11.57114	14	WhatProblem
235	0	6	can you tell me more	f	2021-05-15 14:20:39.514401	14	
236	0	6	 I have noticed my legs have become quite swollen	f	2021-05-15 14:20:41.092981	14	WhatProblem
237	0	6	can you tell me more	f	2021-05-15 14:20:59.285843	14	
238	0	6	My legs have been just really swollen for a few weeks now. It has me a little worried	f	2021-05-15 14:21:00.914075	14	WhatProblem
239	0	7	can you explain more	f	2021-05-16 05:35:27.916409	15	
240	0	6	can you tell me about your problem	f	2021-05-16 10:11:33.888606	14	
241	0	6	I have been struggling to catch my breath at times and I need to see a specialist about this.	f	2021-05-16 10:11:35.374078	14	WhatProblem
242	0	6	can you tell me more	f	2021-05-16 10:11:42.514897	14	
243	0	6	My family doctor has sent me to you because he couldn't help treat my shortness of breath.	f	2021-05-16 10:11:43.856642	14	WhatProblem
244	0	6	 can you tell me more	f	2021-05-16 10:11:52.921662	14	
245	0	6	I have been quite breathless and my regular doctor couldn't help.	f	2021-05-16 10:11:54.424066	14	WhatProblem
246	0	6	can you tell me more	f	2021-05-16 10:11:59.800437	14	
247	0	6	I have been struggling to catch my breath at times and I need to see a specialist about this.	f	2021-05-16 10:12:01.323401	14	WhatProblem
\.


--
-- Name: cases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cases_id_seq', 8, true);


--
-- Name: user_cases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_cases_id_seq', 17, true);


--
-- Name: users_cases_diagnosis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_cases_diagnosis_id_seq', 16, true);


--
-- Name: users_cases_intents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_cases_intents_id_seq', 3, true);


--
-- Name: users_cases_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_cases_notes_id_seq', 5, true);


--
-- Name: users_cases_support_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_cases_support_id_seq', 247, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 35, true);


--
-- Name: cases cases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cases
    ADD CONSTRAINT cases_pkey PRIMARY KEY (id);


--
-- Name: user_cases user_cases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cases
    ADD CONSTRAINT user_cases_pkey PRIMARY KEY (id);


--
-- Name: users_cases_diagnosis users_cases_diagnosis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_diagnosis
    ADD CONSTRAINT users_cases_diagnosis_pkey PRIMARY KEY (id);


--
-- Name: users_cases_intents users_cases_intents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_intents
    ADD CONSTRAINT users_cases_intents_pkey PRIMARY KEY (id);


--
-- Name: users_cases_notes users_cases_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_notes
    ADD CONSTRAINT users_cases_notes_pkey PRIMARY KEY (id);


--
-- Name: users_cases_support users_cases_support_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_support
    ADD CONSTRAINT users_cases_support_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: user_cases fk_case; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cases
    ADD CONSTRAINT fk_case FOREIGN KEY (case_id) REFERENCES public.cases(id) ON DELETE SET NULL;


--
-- Name: users_cases_support fk_cases; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_support
    ADD CONSTRAINT fk_cases FOREIGN KEY (case_id) REFERENCES public.cases(id) ON DELETE SET NULL;


--
-- Name: users_cases_notes fk_cases; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_notes
    ADD CONSTRAINT fk_cases FOREIGN KEY (case_id) REFERENCES public.cases(id) ON DELETE SET NULL;


--
-- Name: users_cases_diagnosis fk_cases; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_diagnosis
    ADD CONSTRAINT fk_cases FOREIGN KEY (case_id) REFERENCES public.cases(id) ON DELETE SET NULL;


--
-- Name: users_cases_intents fk_cases; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_intents
    ADD CONSTRAINT fk_cases FOREIGN KEY (case_id) REFERENCES public.cases(id);


--
-- Name: user_cases fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cases
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: users_cases_support fk_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_support
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: users_cases_notes fk_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_notes
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: users_cases_diagnosis fk_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_diagnosis
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: users_cases_intents fk_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_intents
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

