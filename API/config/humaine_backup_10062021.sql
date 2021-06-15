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
-- Name: cases_diagnosis_result; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cases_diagnosis_result (
    id integer NOT NULL,
    case_id integer NOT NULL,
    diagnosis_id integer NOT NULL
);


ALTER TABLE public.cases_diagnosis_result OWNER TO postgres;

--
-- Name: cases_diagnosis_result_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cases_diagnosis_result_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cases_diagnosis_result_id_seq OWNER TO postgres;

--
-- Name: cases_diagnosis_result_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cases_diagnosis_result_id_seq OWNED BY public.cases_diagnosis_result.id;


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
-- Name: cases_steps_result; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cases_steps_result (
    id integer NOT NULL,
    case_id integer NOT NULL,
    step_id integer NOT NULL
);


ALTER TABLE public.cases_steps_result OWNER TO postgres;

--
-- Name: cases_steps_result_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cases_steps_result_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cases_steps_result_id_seq OWNER TO postgres;

--
-- Name: cases_steps_result_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cases_steps_result_id_seq OWNED BY public.cases_steps_result.id;


--
-- Name: diagnosis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.diagnosis (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.diagnosis OWNER TO postgres;

--
-- Name: diagnosis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.diagnosis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.diagnosis_id_seq OWNER TO postgres;

--
-- Name: diagnosis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.diagnosis_id_seq OWNED BY public.diagnosis.id;


--
-- Name: steps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.steps (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.steps OWNER TO postgres;

--
-- Name: steps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.steps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.steps_id_seq OWNER TO postgres;

--
-- Name: steps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.steps_id_seq OWNED BY public.steps.id;


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
    status integer DEFAULT 0,
    image text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_cases_diagnosis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_cases_diagnosis (
    id integer NOT NULL,
    user_id integer,
    case_id integer,
    diagnosis integer NOT NULL,
    session_id integer NOT NULL
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
    user_id integer NOT NULL,
    case_id integer NOT NULL,
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
-- Name: users_cases_steps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_cases_steps (
    id integer NOT NULL,
    case_id integer NOT NULL,
    user_id integer NOT NULL,
    session_id integer NOT NULL,
    step integer NOT NULL
);


ALTER TABLE public.users_cases_steps OWNER TO postgres;

--
-- Name: users_cases_steps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_cases_steps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_cases_steps_id_seq OWNER TO postgres;

--
-- Name: users_cases_steps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_cases_steps_id_seq OWNED BY public.users_cases_steps.id;


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
-- Name: cases_diagnosis_result id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cases_diagnosis_result ALTER COLUMN id SET DEFAULT nextval('public.cases_diagnosis_result_id_seq'::regclass);


--
-- Name: cases_steps_result id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cases_steps_result ALTER COLUMN id SET DEFAULT nextval('public.cases_steps_result_id_seq'::regclass);


--
-- Name: diagnosis id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diagnosis ALTER COLUMN id SET DEFAULT nextval('public.diagnosis_id_seq'::regclass);


--
-- Name: steps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.steps ALTER COLUMN id SET DEFAULT nextval('public.steps_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_cases_intents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_intents ALTER COLUMN id SET DEFAULT nextval('public.users_cases_intents_id_seq'::regclass);


--
-- Name: users_cases_steps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_steps ALTER COLUMN id SET DEFAULT nextval('public.users_cases_steps_id_seq'::regclass);


--
-- Data for Name: cases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cases (id, case_name, case_description, case_status, case_difficulty, case_created, image, case_department) FROM stdin;
5	Brian Montgomery	This 52 year old man presents with abdominal pain.  Please take a full history with a view to making a diagnosis.	active	Easy	2020-12-02 10:07:08.9764+05:30	default.jpg	Gastroenterology
6	Judith Palfrey	You are the running a respiratory clinic and are asked to see this woman by her primary care doctor who is complaining of dyspnoea. Please take a full history with a view to making a diagnosis. 	active	Moderate	2020-12-02 10:07:08.9764+05:30	default.jpg	Respiratory
7	Berty Le Roux	You are in the medical admissions unit and are asked to see this somewhat reserved man complaining of severe chest pain. He has a CRP of 155 mg/L (0-5), and a CXR as seen in the panel on the left.  His other results are outstanding.  Please take a full history with a view to making a diagnosis.	active	BETA	2020-12-02 10:07:08.9764+05:30	default.jpg	General Medicine
8	Amjad Khan	This 62 year old man presents with breathlessness.  Please take a full history with a view to making a diagnosis.	active	BETA	2020-12-02 10:07:08.9764+05:30	default.jpg	General Medicine
\.


--
-- Data for Name: cases_diagnosis_result; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cases_diagnosis_result (id, case_id, diagnosis_id) FROM stdin;
1	5	1
2	5	8
3	5	10
4	6	2
5	6	3
6	7	4
8	8	2
9	8	5
10	8	9
7	8	1
11	8	4
\.


--
-- Data for Name: cases_steps_result; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cases_steps_result (id, case_id, step_id) FROM stdin;
1	5	1
2	5	11
3	6	5
4	7	8
5	8	1
6	8	5
7	8	8
\.


--
-- Data for Name: diagnosis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.diagnosis (id, name) FROM stdin;
1	AAA screening
2	Abdominal aortic aneurysm
3	Abdominal aortic aneurysm screening
4	Abortion
5	Abscess
6	Acanthosis nigricans
7	Achalasia
8	Acid and chemical burns
9	Acid reflux in babies
10	Acne
11	Acoustic neuroma (vestibular schwannoma)
12	Acromegaly
13	Actinic keratoses (solar keratoses)
14	Actinomycosis
15	Acupuncture
16	Acute cholecystitis
17	Acute kidney injury
18	Acute lymphoblastic leukaemia
19	Acute myeloid leukaemia
20	Acute pancreatitis
21	Acute respiratory distress syndrome
22	Addison's disease
23	Adenoidectomy
24	Age-related cataracts
25	Age-related macular degeneration (AMD)
26	Agoraphobia
27	Air or gas embolism
28	Albinism
29	Alcohol misuse
30	Alcohol poisoning
31	Alcohol-related liver disease
32	Alexander technique
33	Alkaptonuria
34	Allergic rhinitis
35	Allergies
36	Altitude sickness
37	Alzheimer's disease
38	Amblyopia
39	Amnesia
40	Amniocentesis
41	Amputation
42	Amyloidosis
43	Anabolic steroid misuse
44	Anaemia (iron deficiency)
45	Anaemia (vitamin B12 or folate deficiency)
46	Anaesthesia
47	Anal cancer
48	Anal fissure
49	Anal fistula
50	Anal pain
51	Anaphylaxis
52	Androgen insensitivity syndrome
53	Aneurysm (abdominal aortic)
54	Aneurysm (brain)
55	Angelman syndrome
56	Angina
57	Angioedema
58	Angiography
59	Angioplasty
60	Ankle pain
61	Ankylosing spondylitis
62	Anorexia nervosa
63	Anosmia
65	Antacids
66	Antibiotics
67	Anticoagulant medicines
68	Antidepressants
69	Antifungal medicines
70	Antihistamines
71	Antiphospholipid syndrome (APS)
72	Antisocial personality disorder
73	Anus (itchy)
74	Anxiety disorder in adults
75	Anxiety disorders in children
76	Aortic valve replacement
77	Aphasia
78	Appendicitis
79	Arrhythmia
80	Arterial thrombosis
81	Arthritis
82	Arthroscopy
83	Asbestosis
84	Asperger's
85	Aspergillosis
86	Aspirin
87	Asthma
88	Astigmatism
89	Ataxia
90	Atherosclerosis (arteriosclerosis)
91	Athlete's foot
92	Atopic eczema
93	Atrial fibrillation
94	Attention deficit hyperactivity disorder (ADHD)
95	Auditory processing disorder (APD)
96	Autism
97	Autosomal dominant polycystic kidney disease
98	Autosomal recessive polycystic kidney disease
99	Avian flu
100	Baby
101	Back pain
102	Bacterial vaginosis
103	Bad breath
104	Baker's cyst
105	Balanitis
106	Barium enema
107	Bartholin's cyst
108	Basal cell carcinoma
109	Bedbugs
110	Bedwetting in children
111	Behçet's disease
112	Being sick
113	Bell's palsy
114	Benign brain tumour (non-cancerous)
115	Benign prostate enlargement
116	Beta blockers
117	Bile duct cancer (cholangiocarcinoma)
118	Bilharzia
119	Binge eating disorder
120	Biological and biosimilar medicines (biosimilars)
121	Biopsy
122	Bipolar disorder
123	Bird flu
124	Birthmarks
125	Bite (animal or human)
126	Black eye
127	Bladder cancer
128	Bladder stones
129	Bleeding after the menopause
130	Bleeding from the bottom (rectal bleeding)
131	Blepharitis
132	Blindness and vision loss
133	Blisters
134	Blood clots
135	Blood groups
136	Blood in semen (haematospermia)
137	Blood in urine
138	Blood pressure (high)
139	Blood pressure (low)
140	Blood pressure test
141	Blood tests
142	Blood transfusion
143	Blue skin or lips (cyanosis)
144	Blushing
145	Body dysmorphic disorder (BDD)
146	Body odour (BO)
147	Boils
148	Bone cancer
149	Bone cyst
150	Bone density scan (DEXA scan)
151	Borderline personality disorder
152	Botulism
153	Bowel cancer
154	Bowel cancer screening
155	Bowel incontinence
156	Bowel polyps
157	Bowel transplant
158	Bowen's disease
159	Brachycephaly and plagiocephaly
160	Brain abscess
161	Brain aneurysm
162	Brain death
163	Brain haemorrhage
164	Brain tumour (benign)
165	Brain tumour (malignant)
166	Brain tumours
167	Breast abscess
168	Breast cancer in men
169	Breast cancer in women
170	Breast cancer screening
171	Breast lumps
172	Breast pain
173	Breast reduction on the NHS
174	Breath-holding in babies and children
175	Broken ankle
176	Broken arm or wrist
177	Broken collarbone
178	Broken finger or thumb
179	Broken leg
180	Broken nose
181	Broken or bruised ribs
182	Broken toe
183	Bronchiectasis
184	Bronchiolitis
185	Bronchitis
186	Bronchodilators
187	Brucellosis
188	Brugada syndrome
189	Bruxism
190	Bulimia
191	Bullous pemphigoid
192	Bunions
193	Burns and scalds
194	Bursitis
195	Buttock pain
196	CABG
197	Caesarean section
198	Cancer
199	Cannabis oil (medical cannabis)
200	Carbon monoxide poisoning
201	Carcinoembryonic antigen (CEA) test
202	Cardiac catheterisation and coronary angiography
203	Cardiomyopathy
204	Cardiovascular disease
205	Carotid endarterectomy
206	Carpal tunnel syndrome
207	Cartilage damage
208	Cataract surgery
209	Cataracts (age-related)
210	Cataracts (children)
211	Catarrh
212	Cavernoma
213	Cavernous sinus thrombosis
214	Cellulitis
215	Cerebral palsy
216	Cervical cancer
217	Cervical rib
218	Cervical screening
219	Cervical spondylosis
220	Charcot-Marie-Tooth disease
221	Charles Bonnet syndrome
222	Chemotherapy
223	Chest infection
224	Chest pain
225	Chiari malformation
226	Chickenpox
227	Chilblains
228	Chipped
229	Chiropractic
230	Chlamydia
231	Cholangiocarcinoma
232	Cholecystitis (acute)
233	Cholera
234	Cholesteatoma
235	Cholesterol (high)
236	Chorionic villus sampling
237	Chronic fatigue syndrome (CFS/ME)
238	Chronic kidney disease
239	Chronic lymphocytic leukaemia
240	Chronic myeloid leukaemia
241	Chronic obstructive pulmonary disease (COPD)
242	Chronic pancreatitis
243	Chronic traumatic encephalopathy
244	Circumcision in boys
245	Circumcision in men
246	Cirrhosis
247	CJD
248	Claustrophobia
249	Cleft lip and palate
250	Clinical depression
251	Clinical trials
252	Clostridium difficile
253	Club foot
254	Cluster headaches
255	Coated or white tongue
256	Coccydynia (tailbone pain)
257	Coeliac disease
258	Cognitive behavioural therapy (CBT)
259	Cold sores
260	Colic
261	Colon cancer
262	Colonoscopy
263	Colostomy
264	Colour vision deficiency (colour blindness)
265	Colposcopy
266	Coma
267	Common cold
268	Compartment syndrome
269	Complementary and alternative medicine
270	Complex regional pain syndrome
271	Concussion
272	Confusion (sudden)
273	Congenital heart disease
274	Congenital hip dislocation
275	Conjunctivitis
276	Consent to treatment
277	Constipation
278	Contact dermatitis
279	Cornea transplant
280	Corns and calluses
281	Coronary angioplasty and stent insertion
282	Coronary artery bypass graft
283	Coronary heart disease
284	Coronavirus (COVID-19)
285	Corticobasal degeneration
286	Corticosteroid cream
287	Corticosteroids
288	Cosmetic procedures
289	Costochondritis
290	Cough
291	Coughing up blood (blood in phlegm)
292	Counselling
293	COVID-19
294	Cradle cap
295	Craniosynostosis
296	Creutzfeldt-Jakob disease
297	Crohn's disease
298	Croup
299	CT scan
300	Cushing's syndrome
301	Cuts and grazes
302	Cyanosis
303	Cyclical vomiting syndrome
304	Cyclospora
305	Cyclothymia
306	Cystic fibrosis
307	Cystitis
308	Cystoscopy
309	Cytomegalovirus (CMV)
310	Dandruff
311	Deafblindness
312	Deafness
313	Decompression sickness
314	Decongestants
315	Dehydration
316	Delirium
317	Dementia (frontotemporal)
318	Dementia (vascular)
319	Dementia with Lewy bodies
320	Dengue
321	Dental abscess
322	Dental pain
323	Dentures (false teeth)
324	Depression
325	Detached retina (retinal detachment)
326	Developmental dysplasia of the hip
327	DEXA scan
328	Diabetes
329	Diabetes (type 1)
330	Diabetes (type 2)
331	Diabetes in pregnancy
332	Diabetes insipidus
333	Diabetic eye screening
334	Diabetic ketoacidosis
335	Diabetic retinopathy
336	Dialysis
337	Diarrhoea
338	Diarrhoea and vomiting
339	Differences in sex development
340	DiGeorge syndrome (22q11 deletion)
341	Diphtheria
342	Discoid eczema
343	Dislocated kneecap
344	Dislocated shoulder
345	Disorders of consciousness
346	Dissociative disorders
347	Diverticular disease and diverticulitis
348	Dizziness
349	Double vision
350	Down's syndrome
351	Dry eyes
352	Dry lips
353	Dry mouth
354	Dupuytren's contracture
355	DVT
356	DVT (deep vein thrombosis)
357	Dwarfism
358	Dysarthria (difficulty speaking)
359	Dysentery
360	Dyslexia
361	Dysphagia (swallowing problems)
362	Dyspraxia in children
363	Dystonia
364	Ear infections
365	Earache
366	Eardrum (burst)
367	Early menopause
368	Early or delayed puberty
369	Earwax build-up
370	Eating disorders
371	Ebola virus disease
372	Echocardiogram
373	Ectopic beats
374	Ectopic pregnancy
375	Ectropion
376	Eczema (atopic)
377	Eczema (contact dermatitis)
378	Eczema (discoid)
379	Eczema (varicose)
380	Edwards' syndrome (trisomy 18)
381	Ehlers-Danlos syndromes
382	Ejaculation problems
383	Elbow and arm pain
384	Electrocardiogram (ECG)
385	Electroencephalogram (EEG)
386	Electrolyte test
387	Embolism
388	Emollients
389	Empyema
390	Encephalitis
391	Endocarditis
392	Endometrial cancer
393	Endometriosis
394	Endoscopy
395	Enhanced recovery
396	Epidermolysis bullosa
397	Epididymitis
398	Epidural
399	Epiglottitis
400	Epilepsy
401	Erectile dysfunction (impotence)
402	Erythema multiforme
403	Erythema nodosum
404	Erythromelalgia
405	Essential tremor
406	Euthanasia and assisted suicide
407	Ewing sarcoma
408	Excessive hair growth (hirsutism)
409	Exophthalmos (bulging eyes)
410	Eye cancer
411	Eye floaters
412	Eye infection (herpes)
413	Eye injuries
414	Eye tests for children
415	Eyelid problems
416	Fabricated or induced illness
417	Face blindness
418	Fainting
419	Falls
420	Farting (flatulence)
421	Febrile seizures
422	Feeling sick (nausea)
423	Female genital mutilation (FGM)
424	Femoral hernia repair
425	Fibroids
426	Fibromyalgia
427	First aid
428	Fits (children with fever)
429	Fits (seizures)
430	Flat feet
431	Flat head syndrome
432	Floaters and flashes in the eyes
433	Flu
434	Fluoride
435	Foetal alcohol syndrome
436	Food allergy
437	Food colours and hyperactivity
438	Food intolerance
439	Food poisoning
440	Foot drop
441	Foot pain
442	Foreskin problems
443	Frontotemporal dementia
444	Frostbite
445	Frozen shoulder
446	Functional neurological disorder
447	Fungal nail infection
448	Gallbladder cancer
449	Gallbladder pain
450	Gallbladder removal
451	Gallstones
452	Ganglion cyst
453	Gangrene
454	Gastrectomy
455	Gastritis
456	Gastro-oesophageal reflux disease (GORD)
457	Gastroenteritis
458	Gastroparesis
459	Gastroscopy
460	Gender dysphoria
461	General anaesthesia
462	Generalised anxiety disorder in adults
463	Genetic and genomic testing
464	Genetic test for cancer gene
465	Genital herpes
466	Genital warts
467	Gestational diabetes
468	Giant cell arteritis
469	Giardiasis
470	Gigantism
471	Gilbert's syndrome
472	Glandular fever
473	Glaucoma
474	Glomerulonephritis
475	Glue ear
476	Glutaric aciduria type 1
477	Goitre
478	Gonorrhoea
479	Gout
480	Granuloma annulare
481	Group B strep
482	Growing pains
483	Guillain-Barré syndrome
484	Gum disease
485	Haemochromatosis
486	Haemophilia
487	Haemophilus influenzae type b (Hib)
488	Hair dye reactions
489	Hair loss
490	Hairy cell leukaemia
491	Halitosis
492	Hallucinations and hearing voices
493	Hamstring injury
494	Hand pain
495	Hand tendon repair
496	Hand
497	Hay fever
498	Head and neck cancer
499	Head injury and concussion
500	Head lice and nits
501	Headaches
502	Headaches (hormone)
503	Headaches (tension-type)
504	Headaches in children
505	Health anxiety
506	Hearing loss
507	Hearing tests
508	Hearing tests for children
509	Hearing voices
510	Heart attack
511	Heart block
512	Heart bypass
513	Heart disease (coronary)
514	Heart failure
515	Heart pain
516	Heart palpitations and ectopic beats
517	Heart rhythm problems
518	Heart transplant
519	Heart valve problems
520	Heart valve replacement
521	Heart-lung transplant
522	Heartburn and acid reflux
523	Heat exhaustion and heatstroke
524	Heat rash (prickly heat)
525	Heavy periods
526	Heel pain
527	Henoch-Schönlein purpura (HSP)
528	Hepatitis
529	Hepatitis A
530	Hepatitis B
531	Hepatitis C
532	Herbal medicines
533	Herceptin (trastuzumab)
534	Hereditary haemorrhagic telangiectasia (HHT)
535	Hereditary neuropathy with pressure palsies (HNPP)
536	Hereditary spastic paraplegia
537	Hernia
538	Hernia (femoral)
539	Hernia (hiatus)
540	Hernia (inguinal)
541	Hernia (umbilical)
542	Herpes (genital)
543	Herpes in babies
544	Herpes simplex eye infections
545	Herpetic whitlow (whitlow finger)
546	Hiatus hernia
547	Hiccups
548	Hidradenitis suppurativa (HS)
549	High blood pressure (hypertension)
550	High cholesterol
551	High temperature (fever) in adults
552	High temperature (fever) in children
553	Hip dysplasia
554	Hip fracture
555	Hip pain in adults
556	Hip pain in children (irritable hip)
557	Hip replacement
558	Hirschsprung's disease
559	Hirsutism
560	HIV and AIDS
561	Hives
562	Hoarding disorder
563	Hodgkin lymphoma
564	Home oxygen therapy
565	Homeopathy
566	Homocystinuria
567	Hookworm
568	Hormone headaches
569	Hormone replacement therapy (HRT)
570	HRT
571	Hughes syndrome
572	Human papillomavirus (HPV)
573	Huntington's disease
574	Hydrocephalus
575	Hydronephrosis
576	Hyperglycaemia (high blood sugar)
577	Hyperhidrosis
578	Hyperparathyroidism
579	Hypersomnia
580	Hypersensitivity Pneumonitis
581	Hypertension
582	Hyperthyroidism
583	Hypnotherapy
584	Hypochondria
585	Hypoglycaemia (low blood sugar)
586	Hypoparathyroidism
587	Hypotension
588	Hypothermia
589	Hypothyroidism
590	Hypotonia
591	Hysterectomy
592	Hysteroscopy
593	IBS
594	Ichthyosis
595	Idiopathic pulmonary fibrosis
596	Ileostomy
597	Impetigo
598	Impotence
599	Incontinence (urinary)
600	Indigestion
601	Infected piercings
602	Infertility
603	Inflammatory bowel disease
604	Influenza
605	Ingrown hairs
606	Ingrown toenail
607	Inguinal hernia repair
608	Insect bites and stings
609	Insomnia
610	Intensive care
611	Intersex
612	Interstitial cystitis
613	Intracranial hypertension
614	Intrauterine insemination (IUI)
615	Iron deficiency anaemia
616	Irregular periods
617	Irritable bowel syndrome (IBS)
618	Irritable hip
619	Isovaleric acidaemia
620	Itchy bottom
621	Itchy skin
622	IVF
623	Japanese encephalitis
624	Jaundice
625	Jaundice in newborns
626	Jaw pain
627	Jellyfish and other sea creature stings
628	Jet lag
629	Joint hypermobility syndrome
630	Joint pain
631	Kaposi's sarcoma
632	Kawasaki disease
633	Keratosis pilaris
634	Kidney cancer
635	Kidney failure
636	Kidney infection
637	Kidney stones
638	Kidney transplant
639	Klinefelter syndrome
640	Knee ligament surgery
641	Knee pain
642	Knee replacement
643	Knock knees
644	Knocked-out tooth
645	Kwashiorkor
646	Kyphosis
647	Leaky gut syndrome""
648	Labial fusion
649	Labyrinthitis and vestibular neuritis
650	Lactate dehydrogenase (LDH) test
651	Lactose intolerance
652	Lambert-Eaton myasthenic syndrome
653	Laparoscopy (keyhole surgery)
654	Laryngeal (larynx) cancer
655	Laryngitis
656	Laxatives
657	Lazy eye
658	Learning disabilities
659	Leg cramps
660	Leg ulcer
661	Legionnaires' disease
662	Leptospirosis (Weil's disease)
663	Leukaemia (acute lymphoblastic)
664	Leukaemia (acute myeloid)
665	Leukaemia (chronic lymphocytic)
666	Leukaemia (chronic myeloid)
667	Leukaemia (hairy cell)
668	Leukoplakia
669	Lichen planus
670	Lichen sclerosus
671	Limping in children
672	Lipoedema
673	Lipoma
674	Lips (sore or dry)
675	Listeriosis
676	Liver cancer
677	Liver disease
678	Liver disease (alcohol-related)
679	Liver transplant
680	Local anaesthesia
681	Long QT syndrome
682	Long-sightedness
683	Loss of libido (reduced sex drive)
684	Lost or changed sense of smell
685	Low blood pressure (hypotension)
686	Low blood sugar (hypoglycaemia)
687	Low sperm count
688	Low white blood cell count
689	Lumbar decompression surgery
690	Lumbar puncture
691	Lumps
692	Lung cancer
693	Lung transplant
694	Lupus
695	Lyme disease
696	Lymphoedema
697	Macular degeneration (age-related)
698	Macular hole
699	Magnesium test
700	Malaria
701	Male menopause
702	Malignant brain tumour (brain cancer)
703	Mallet finger
704	Malnutrition
705	Maple syrup urine disease
706	Marfan syndrome
707	Mastectomy
708	Mastitis
709	Mastocytosis
710	Mastoiditis
711	MCADD
712	Measles
713	Medically unexplained symptoms
714	Medicines information
715	Memory loss (amnesia)
716	Meningitis
717	Menopause
718	Menopause (early)
719	Menstrual pain
720	Mental health and wellbeing
721	Mesothelioma
722	Metabolic syndrome
723	Metallic taste
724	Middle East respiratory syndrome (MERS)
725	Migraine
726	Miscarriage
727	Mitral valve problems
728	Molar pregnancy
729	Moles
730	Molluscum contagiosum
731	Monkeypox
732	Morton's neuroma
733	Motion sickness
734	Motor neurone disease
735	Mouth cancer
736	Mouth thrush
737	Mouth ulcers
738	MRI scan
739	MRSA
740	Mucositis
741	Multiple myeloma
742	Multiple sclerosis
743	Multiple system atrophy
744	Mumps
745	Munchausen's syndrome
746	Muscular dystrophy
747	Myalgic encephalomyelitis (ME)
748	Myasthenia gravis
749	Mycobacterium chimaera infection
750	Myelodysplastic syndrome (myelodysplasia)
751	Myeloma
752	Myopia
753	Myositis (polymyositis and dermatomyositis)
754	Ménière's disease
755	Nail fungal infection
756	Nail patella syndrome
757	Nail problems
758	Narcolepsy
759	Nasal and sinus cancer
760	Nasal polyps
761	Nasopharyngeal cancer
762	Nausea
763	Neck pain
764	Necrotising fasciitis
765	Neonatal herpes (herpes in a baby)
766	Nephrotic syndrome in children
767	Neuroblastoma
768	Neuroendocrine tumours
769	Neuroendocrine tumours and carcinoid syndrome
770	Neurofibromatosis type 1
771	Neurofibromatosis type 2
772	Neuromyelitis optica
773	Newborn jaundice
774	Newborn respiratory distress syndrome
775	NHS screening
776	Night sweats
777	Night terrors and nightmares
778	Nipple discharge
779	Noise sensitivity (hyperacusis)
780	Non-alcoholic fatty liver disease (NAFLD)
781	Non-allergic rhinitis
782	Non-gonococcal urethritis
783	Non-Hodgkin lymphoma
784	Noonan syndrome
785	Norovirus (vomiting bug)
786	Nose cancer
787	Nosebleed
788	NSAIDs
789	Obesity
790	Obsessive compulsive disorder (OCD)
791	Occupational therapy
792	Oesophageal cancer
793	Oral thrush (mouth thrush)
794	Orf
795	Orthodontics
796	Osteoarthritis
797	Osteomalacia
798	Osteomyelitis
799	Osteopathy
800	Osteophyte (bone spur)
801	Osteoporosis
802	Otosclerosis
803	Ovarian cancer
804	Ovarian cyst
805	Overactive thyroid (hyperthyroidism)
806	Ovulation pain
807	Oxygen therapy
808	Pacemaker implantation
809	Paget's disease of bone
810	Paget's disease of the nipple
811	Palpitations
812	Pancreas transplant
813	Pancreatic cancer
814	Pancreatitis (acute)
815	Pancreatitis (chronic)
816	Panic disorder
817	Paralysis
818	Parkinson's disease
819	Patau's syndrome
820	Peak flow test
821	Pelvic inflammatory disease
822	Pelvic organ prolapse
823	Pelvic pain
824	Pemphigus vulgaris
825	Penile cancer
826	Perforated eardrum
827	Pericarditis
828	Period pain
829	Periods
830	Periods (heavy)
831	Periods (irregular)
832	Periods (stopped or missed)
833	Peripheral arterial disease (PAD)
834	Peripheral neuropathy
835	Peritonitis
836	Personality disorder
837	PET scan
838	Phaeochromocytoma
839	Phenylketonuria
840	Phimosis
841	Phlebitis (superficial thrombophlebitis)
842	Phobias
843	Phosphate test
844	Photodynamic therapy (PDT)
845	Physiotherapy
846	Piles
847	Piles (haemorrhoids)
848	Pilonidal sinus
849	Pins and needles
850	PIP breast implants
851	Pityriasis rosea
852	Pityriasis versicolor
853	Plantar fasciitis
854	Plastic surgery
855	Pleurisy
856	PMS (premenstrual syndrome)
857	Pneumonia
858	Poisoning
859	Polio
860	Polycystic kidney disease (autosomal dominant)
861	Polycystic kidney disease (autosomal recessive)
862	Polycystic ovary syndrome
863	Polycythaemia
864	Polyhydramnios (too much amniotic fluid)
865	Polymorphic light eruption
866	Polymyalgia rheumatica
867	Pompholyx (dyshidrotic eczema)
868	Popliteal cyst
869	Post-herpetic neuralgia
870	Post-mortem
871	Post-polio syndrome
872	Post-traumatic stress disorder (PTSD)
873	Postmenopausal bleeding
874	Postnatal depression
875	Postpartum psychosis
876	Postural tachycardia syndrome (PoTS)
877	Potassium test
878	Prader-Willi syndrome
879	Pre-eclampsia
880	Premature ejaculation
881	Pressure ulcers (pressure sores)
882	Priapism (painful erections)
883	Prickly heat
884	Probiotics
885	Proctalgia
886	Progressive supranuclear palsy
887	Prolapse (pelvic organ)
888	Prosopagnosia (face blindness)
889	Prostate cancer
890	Prostate enlargement
891	Prostate problems
892	Prostatitis
893	Psoriasis
894	Psoriatic arthritis
895	Psychiatry
896	Psychosis
897	Puberty (early or delayed)
898	Pubic lice
899	Pudendal neuralgia
900	Pulmonary embolism
901	Pulmonary fibrosis
902	Pulmonary hypertension
903	Pyoderma gangrenosum
904	Q fever
905	Quinsy
906	Rabies
907	Radiotherapy
908	Rashes in babies and children
909	Raynaud's
910	Reactive arthritis
911	Rectal bleeding
912	Rectal cancer
913	Rectal examination
914	Red blood cell count
915	Red eye
916	Reflux in babies
917	Repetitive strain injury (RSI)
918	Respiratory tract infections (RTIs)
919	Restless legs syndrome
920	Restricted growth (dwarfism)
921	Retinal detachment
922	Retinal migraine
923	Retinoblastoma (eye cancer in children)
924	Rett syndrome
925	Reye's syndrome
926	Rhesus disease
927	Rheumatic fever
928	Rheumatoid arthritis
929	Rhinitis (allergic)
930	Rickets and osteomalacia
931	Ringworm
932	Root canal treatment
933	Rosacea
934	Roseola
935	Roundworm
936	Rubella (german measles)
937	Salivary gland stones
938	Sarcoidosis
939	SARS (severe acute respiratory syndrome)
940	Scabies
941	Scarlet fever
942	Scars
943	Schistosomiasis (bilharzia)
944	Schizophrenia
945	Sciatica
946	Scleroderma
947	Scoliosis
948	Scurvy
949	Seasonal affective disorder (SAD)
950	Seizures (children with fever)
951	Seizures (fits)
952	Selective mutism
953	Selective serotonin reuptake inhibitors (SSRIs)
954	Self-harm
955	Sense of smell (lost/changed)
956	Sepsis
957	Septic arthritis
958	Severe head injury
959	Sexually transmitted infections (STIs)
960	Shaking
961	Shin pain (shin splints)
962	Shin splints
963	Shingles
964	Short-sightedness (myopia)
965	Shortness of breath
966	Shoulder impingement
967	Shoulder pain
968	Sick building syndrome
969	Sickle cell disease
970	Silicosis
971	Sinus cancer
972	Sinusitis
973	Sinusitis (sinus infection)
974	Sjögren's syndrome
975	Skin cancer (melanoma)
976	Skin cancer (non-melanoma)
977	Skin cyst
978	Skin picking disorder
979	Skin tags
980	Slapped cheek syndrome
981	Sleep apnoea
982	Sleep paralysis
983	Sleepwalking
984	Slipped disc
985	Small bowel transplant
986	Smear test
987	Smelly urine
988	Smoking (treatments to stop)
989	Snake bites
990	Snoring
991	Social anxiety (social phobia)
992	Social care and support guide
993	Soft tissue sarcomas
994	Soiling (child pooing their pants)
995	Solar keratoses
996	Sore lips
997	Sore or white tongue
998	Sore throat
999	Sperm count (low)
1000	Spina bifida
1001	Spinal muscular atrophy
1002	Spirometry
1003	Spleen problems and spleen removal
1004	Spondylolisthesis
1005	Sports injuries
1006	Sprains and strains
1007	Squamous cell carcinoma
1008	Squint
1009	Stammering
1010	Staph infection
1011	Statins
1012	Stem cell and bone marrow transplants
1013	Stent insertion
1014	Steroid cream
1015	Steroid inhalers
1016	Steroid injections
1017	Steroid misuse
1018	Steroid nasal sprays
1019	Steroid tablets
1020	Steroids
1021	Stevens-Johnson syndrome
1022	Stillbirth
1023	Sting or bite (insect)
1024	Stomach ache
1025	Stomach bug
1026	Stomach cancer
1027	Stomach ulcer
1028	Stop smoking treatments
1029	Stopped or missed periods
1030	Stretch marks
1031	Stroke
1032	Stuttering
1033	Stye
1034	Subarachnoid haemorrhage
1035	Subdural haematoma
1036	Sudden confusion (delirium)
1037	Sudden infant death syndrome (SIDS)
1038	Suicidal thoughts
1039	Sunburn
1040	Superficial thrombophlebitis
1041	Supraventricular tachycardia (SVT)
1042	Surgery (having an operation)
1043	Swallowing pills
1044	Swallowing problems
1045	Sweat rash
1046	Sweating (excessive)
1048	Sweating at night
1049	Swine flu (H1N1)
1050	Swollen ankles
1051	Swollen arms and hands (oedema)
1052	Swollen glands
1053	Syphilis
1054	Tapeworm
1055	Tay-Sachs disease
1056	Teeth grinding (bruxism)
1057	Temporal arteritis
1058	Temporomandibular disorder (TMD)
1059	Tendonitis
1060	Tennis elbow
1061	TENS (transcutaneous electrical nerve stimulation)
1062	Tension-type headaches
1063	Testicle lumps and swellings
1064	Testicular cancer
1065	Tetanus
1066	Thalassaemia
1067	Thirst (excessive)
1068	Thoracic outlet syndrome
1069	Threadworms
1070	Throat (sore)
1071	Thrombophilia
1072	Thrush in men and women
1073	Thyroid cancer
1074	Thyroiditis
1075	TIA
1076	Tick-borne encephalitis (TBE)
1077	Tics
1078	Tight foreskin (phimosis and paraphimosis)
1079	Tinnitus
1080	Toe pain
1081	Tongue (sore or white)
1082	Tongue cancer
1083	Tongue-tie
1084	Tonsillitis
1085	Tooth (chipped or broken)
1086	Tooth decay
1087	Tooth knocked out
1088	Toothache
1089	Total protein test
1090	Tourette's syndrome
1091	Toxic shock syndrome
1092	Toxocariasis
1093	Toxoplasmosis
1094	Tracheostomy
1095	Transient ischaemic attack (TIA)
1096	Transurethral resection of the prostate (TURP)
1097	Travel vaccinations
1098	Tremor
1099	Tremor or shaking hands
1100	Trichomoniasis
1101	Trichotillomania (hair pulling disorder)
1102	Trigeminal neuralgia
1103	Trigger finger
1104	Trimethylaminuria ('fish odour syndrome')
1105	Tuberculosis (TB)
1106	Tuberous sclerosis
1107	Tummy ache
1108	Tummy bug
1109	Turner syndrome
1110	Twitching eyes and muscles
1111	Type 1 diabetes
1112	Type 2 diabetes
1113	Typhoid fever
1114	Typhus
1115	Ulcerative colitis
1116	Ultrasound scan
1117	Umbilical hernia repair
1118	Underactive thyroid (hypothyroidism)
1119	Undescended testicles
1120	Unintentional weight loss
1121	Urethritis (NGU)
1122	Urinary catheter
1123	Urinary incontinence
1124	Urinary tract infections (UTIs)
1125	Urine (smelly)
1126	Urine albumin to creatinine ratio (ACR)
1127	Uterine (womb) cancer
1128	Uveitis
1129	Vaccinations
1130	Vaginal cancer
1131	Vaginal discharge
1132	Vaginal dryness
1133	Vaginal pain
1134	Vaginismus
1135	Vaginitis
1136	Varicose eczema
1137	Varicose veins
1138	Vascular dementia
1139	Vasculitis
1140	Vegetative state
1141	Venous leg ulcer
1142	Vertigo
1143	Vestibular neuritis
1144	Vestibular schwannoma
1145	Vitamin B12 or folate deficiency anaemia
1146	Vitamins and minerals
1147	Vitiligo
1148	Vomiting
1149	Vomiting blood (haematemesis)
1150	Vomiting bug
1151	Von Willebrand disease
1152	Vulval cancer
1153	Vulvodynia (vulval pain)
1154	Warts and verrucas
1155	Watering eyes
1156	Wegener's granulomatosis
1157	Weight loss (unexpected)
1158	Weight loss surgery
1159	Weil's disease
1160	West Nile virus
1161	Whiplash
1162	White blood cell count (low)
1163	Whitlow finger
1164	Whooping cough
1165	Wind
1166	Winter vomiting bug
1167	Wisdom tooth removal
1168	Wolff-Parkinson-White syndrome
1169	Womb (uterus) cancer
1170	Worms in humans
1171	X-ray
1172	Yellow fever
1173	Zika virus
\.


--
-- Data for Name: steps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.steps (id, name) FROM stdin;
1	Blood cultures
2	Bedside blood glucose
3	ECG
4	Chest X-ray
5	Abdominal X-ray
6	Bony X-ray
7	Ultrasound scan
8	CT Scan
9	MRI Scan
10	Bedside peak flow
11	Urine sample
12	Sputum sample
13	Urinary catheter
14	Arterial blood gas
15	Venous blood gas
16	Gastric endoscopy
17	Colonoscopy
18	Rectal exam
19	Stool sample
20	Wound swab
\.


--
-- Data for Name: user_cases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_cases (id, case_id, user_id, status, created_at, stopped_at) FROM stdin;
1	5	16	attempted	2021-01-13 00:00:00	2021-01-17 03:30:39.402538
2	5	16	attempted	2021-01-13 00:00:00	2021-01-17 03:30:39.402538
14	8	23	in_progress	2021-03-21 00:00:00	\N
3	5	16	attempted	2021-01-14 00:00:00	2021-04-17 21:44:42.643
15	5	0	attempted	2021-03-31 00:00:00	2021-04-17 21:44:42.643
16	5	0	attempted	2021-04-17 00:00:00	2021-04-17 22:31:38.182
17	5	0	attempted	2021-04-17 00:00:00	2021-04-17 22:31:49.695
18	5	0	attempted	2021-04-17 00:00:00	2021-04-17 23:00:03.198
19	5	0	attempted	2021-04-17 23:00:08.305022	2021-04-20 19:36:30.759
20	5	0	attempted	2021-04-20 19:36:40.753591	2021-04-20 19:36:47.705
21	5	0	attempted	2021-04-20 19:37:02.130309	2021-04-20 19:37:36.222
22	5	0	attempted	2021-04-20 19:37:54.166388	2021-04-20 19:38:22.336
23	5	0	attempted	2021-04-20 19:38:30.473133	2021-04-20 20:01:22.744
24	5	0	attempted	2021-04-20 20:01:26.467955	2021-04-20 20:21:59.026
25	5	16	attempted	2021-04-20 20:22:07.646825	2021-05-11 04:43:10.17
4	6	16	attempted	2021-01-14 00:00:00	2021-05-11 04:43:41.093
12	8	16	attempted	2021-01-17 00:00:00	2021-05-11 04:47:08.088
26	8	16	attempted	2021-04-20 20:18:07.646825	2021-04-20 23:22:07.646825
32	7	0	in_progress	2021-05-26 21:04:53.722984	\N
33	5	0	in_progress	2021-05-27 11:34:09.001524	\N
34	8	0	in_progress	2021-05-27 11:36:48.330272	\N
31	6	0	attempted	2021-05-26 21:04:30.357547	2021-05-27 14:05:01.269624
35	6	0	in_progress	2021-05-27 21:22:36.134731	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, title, institution, level_of_training, gender, country, date_of_birth, status, image) FROM stdin;
16	ammaryousaf@gmail.com	9f08e0e14eb93c9cd05fdcae991d5f35	Malik Ahs	Mr	Naruto Academysss	Narutosss	male	Pakistan	1993-11-20	1	https://res.cloudinary.com/home-tutor/image/upload/v1621523835/humaine/tulvlevcib0nsom5imod.png
0	humainenlp@gmail.com	641fcbb54be26270abb2b91c7e795317	Humaine	Mr	Humaine.co	\N	male	UK	1993-03-18	1	\N
18	ammaryousaf123@gmail.com	c90c8d775a8f601d38c42192c8f70020	Ammar Yousaf	\N	\N	\N	\N	\N	\N	0	\N
21	ammarYousaf66@gmail.com	7ec6bc6bce00ff8f8705299f9fdd72b9	Ammar	\N	\N	\N	\N	\N	\N	0	\N
23	aasim@gmail	7ec6bc6bce00ff8f8705299f9fdd72b9	Ammar	\N	\N	\N	\N	\N	\N	1	\N
26	ammaryousaf6@gmail.com	7ec6bc6bce00ff8f8705299f9fdd72b9	Ammar	\N	\N	\N	\N	\N	\N	0	\N
\.


--
-- Data for Name: users_cases_diagnosis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_cases_diagnosis (id, user_id, case_id, diagnosis, session_id) FROM stdin;
66	16	5	1	27
67	16	5	3	27
68	16	5	1	26
69	16	5	3	26
70	16	8	1	26
71	16	8	3	26
72	16	8	3	27
73	16	8	7	27
74	16	8	13	27
75	16	8	5	27
76	16	8	1	27
77	16	8	2	27
78	16	8	3	27
79	16	8	1	27
80	16	8	2	27
81	16	8	3	27
82	16	8	4	27
83	16	8	7	27
84	16	8	8	27
85	16	8	2	27
86	16	8	5	27
87	16	8	7	27
88	16	8	5	27
89	16	8	7	27
90	16	8	4	27
91	16	8	6	27
92	16	8	7	27
93	16	8	2	27
94	16	8	3	27
95	16	8	3	27
96	16	8	1	27
97	16	8	3	27
98	16	8	17	27
99	0	6	50	31
\.


--
-- Data for Name: users_cases_intents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_cases_intents (id, user_id, case_id, intent) FROM stdin;
3	0	7	{"ADLs":0,"AbdoCramps":0,"AbdoDistention":0,"AbdoPain":0,"Accommodation":0,"Age":0,"Alcohol":0,"AllergyHx":0,"AnimalAllergy":0,"AntiSickness":0,"Appendicectomy":0,"Appetite":0,"AsbestosExposure":0,"Ascites":0,"AssociatedFactors":0,"AssociatedFactorsPast":0,"BarleyExposure":0,"BeeWaspStingAllergy":0,"BerylliumExposure":0,"BirdAllergy":0,"Bloatedness":0,"BloodyStool":0,"BowelFrequency":0,"BowelHabit":0,"BowelIncontinence":0,"BowelMotions":0,"CasualPartner":0,"CheckDrug":0,"Character":0,"ChestPain":0,"Cholecystectomy":0,"CoalExposure":0,"ColdWeatherExacerbation":0,"Colonoscopy":0,"Concern":0,"ConfirmName":0,"ConfirmProblem":0,"Constipation":0,"Contacts":0,"CottonExposure":0,"Cough":0,"DIabetes":0,"DOB":0,"DampHome":0,"DarkUrine":0,"Delivery":0,"Diarrhea":0,"Diet":0,"DiagnosticStatement":0,"Diarrhoea":0,"DoctorQuestion":0,"DrugAbuse":0,"DrugHx":0,"DustExposure":0,"Dyspepsia":0,"Dysphagia":0,"EggAllergy":0,"Empathy":0,"EnvironmentChangeHouse":0,"ExacerbatingFactors":0,"Exercise":0,"ExerciseToleranceNorm":0,"ExerciseToleranceNow":0,"Expectations":0,"FamilyHx":0,"FamilyMember":0,"FarmingExposure":0,"Fever":0,"FoodAllergy":0,"Frequency":0,"FrequencyUrine":0,"Followup":"","GORD":0,"Gastritis":0,"Goodbye":0,"Haematemesis":0,"Haemoptysis":0,"HaemoptysisMixedStreak":0,"Hayfever":0,"Heart attack":0,"HerniaOp":0,"HiatusHernia":0,"Hoarseness":0,"Hobbies":0,"Ideas":0,"IVDU":0,"IndustrialExposure":0,"IntroAndName":0,"Introduction":0,"ItchyEyesNoseThroat":0,"Jaundice":0,"LUTOpen":0,"Lethargy":0,"Lifestyle":0,"ManagementPlan":0,"MushroomExposure":0,"Name":0,"NameAndDOB ":0,"NameAndAge":0,"Nausea":0,"NeuroSOB":0,"NewWorkConditions":0,"NewLivingConditions":0,"Nocturia":0,"NutsAllergy":0,"OGD":0,"OTCDrugHx":0,"Occupation":0,"Odynophagia":0,"Onset":0,"OnsetTrigger":0,"Orthopnoea":0,"OtherProblems":0,"PND":0,"PUD":0,"PainKiller":0,"PainfulDefecation":0,"PaleStool":0,"Partner":0,"PassiveSmoke":0,"PassiveSmokeContact":0,"PastMedicalHx":0,"PastSurgicalHx":0,"PeripheralOedema":0,"PetsExposure":0,"Piles":0,"PillowsSleep":0,"PollenAllergy":0,"PreviousICU":0,"PreviousTransfusions":0,"ProblemBefore":0,"ProblemProgression":0,"ProblemStart":0,"PrutitisAni":0,"PrutitisSkin":0,"ProblemStartPast":0,"PruritisAni":0,"PruritisSkin":0,"Radiation":0,"RadiationPast":0,"Reassurance":0,"RecentTreatment":0,"RegularPartner":0,"RelievingFactors":0,"Rhinitis":0,"SOB":0,"SOBWork":0,"SafeSex":0,"SeafoodAllergy":0,"SeasonVariation":0,"Severity":0,"SexType":0,"Site":0,"SitePast":0,"SkinChange":0,"SmallTalk":0,"Smoke":0,"Sleep":0,"Sneezing":0,"SOBExert":0,"SOBExertion":0,"SOBVariation":0,"Sputum":0,"SputumAmount":0,"SputumColour":0,"StoolBulk":0,"StoolConsistency":0,"StoolDescribe":0,"StoolFloat":0,"StoolMucus":0,"StoolSmell":0,"StressIncontinence":0,"Summary":0,"SurgeryPast":0,"Sweating":0,"Tenesmus":0,"TermDelivery":0,"Timing":0,"TimingPast":0,"TransitionPoints":0,"TravelHx":0,"Urgency":0,"Vomit":0,"WeightLoss":0,"WhatProblem":0,"Wheeze":0,"WheezeWork":0,"ask_rephrase":0,"backtrack":0,"default":0,"Palpitations":0,"PillowSleep":0,"MasonryExposure":0,"ConstructionExposure":0,"CeramicsExposure":0,"Arrhythmia":0,"Anxiety":0,"Stress":0}
1	0	6	{"ADLs":0,"AbdoCramps":0,"AbdoDistention":0,"AbdoPain":0,"Accommodation":0,"Age":0,"Alcohol":0,"AllergyHx":0,"AnimalAllergy":0,"AntiSickness":0,"Appendicectomy":0,"Appetite":0,"AsbestosExposure":0,"Ascites":0,"AssociatedFactors":0,"AssociatedFactorsPast":0,"BarleyExposure":0,"BeeWaspStingAllergy":0,"BerylliumExposure":0,"BirdAllergy":0,"Bloatedness":0,"BloodyStool":0,"BowelFrequency":0,"BowelHabit":0,"BowelIncontinence":0,"BowelMotions":0,"CasualPartner":0,"CheckDrug":0,"Character":0,"ChestPain":0,"Cholecystectomy":0,"CoalExposure":0,"ColdWeatherExacerbation":0,"Colonoscopy":0,"Concern":0,"ConfirmName":0,"ConfirmProblem":0,"Constipation":0,"Contacts":0,"CottonExposure":0,"Cough":0,"DIabetes":0,"DOB":0,"DampHome":0,"DarkUrine":0,"Delivery":0,"Diarrhea":0,"Diet":0,"DiagnosticStatement":0,"Diarrhoea":0,"DoctorQuestion":0,"DrugAbuse":0,"DrugHx":0,"DustExposure":0,"Dyspepsia":0,"Dysphagia":0,"EggAllergy":0,"Empathy":0,"EnvironmentChangeHouse":0,"ExacerbatingFactors":0,"Exercise":0,"ExerciseToleranceNorm":0,"ExerciseToleranceNow":0,"Expectations":0,"FamilyHx":0,"FamilyMember":0,"FarmingExposure":0,"Fever":0,"FoodAllergy":0,"Frequency":0,"FrequencyUrine":0,"Followup":"Introduction","GORD":0,"Gastritis":0,"Goodbye":0,"Haematemesis":0,"Haemoptysis":0,"HaemoptysisMixedStreak":0,"Hayfever":0,"Heart attack":0,"HerniaOp":0,"HiatusHernia":0,"Hoarseness":0,"Hobbies":0,"Ideas":0,"IVDU":0,"IndustrialExposure":0,"IntroAndName":0,"Introduction":4,"ItchyEyesNoseThroat":0,"Jaundice":0,"LUTOpen":0,"Lethargy":0,"Lifestyle":0,"ManagementPlan":0,"MushroomExposure":0,"Name":1,"NameAndDOB ":0,"NameAndAge":0,"Nausea":0,"NeuroSOB":0,"NewWorkConditions":0,"NewLivingConditions":0,"Nocturia":0,"NutsAllergy":0,"OGD":0,"OTCDrugHx":0,"Occupation":0,"Odynophagia":0,"Onset":0,"OnsetTrigger":0,"Orthopnoea":0,"OtherProblems":0,"PND":0,"PUD":0,"PainKiller":0,"PainfulDefecation":0,"PaleStool":0,"Partner":0,"PassiveSmoke":0,"PassiveSmokeContact":0,"PastMedicalHx":0,"PastSurgicalHx":0,"PeripheralOedema":0,"PetsExposure":0,"Piles":0,"PillowsSleep":0,"PollenAllergy":0,"PreviousICU":0,"PreviousTransfusions":0,"ProblemBefore":0,"ProblemProgression":0,"ProblemStart":0,"PrutitisAni":0,"PrutitisSkin":0,"ProblemStartPast":0,"PruritisAni":0,"PruritisSkin":0,"Radiation":0,"RadiationPast":0,"Reassurance":0,"RecentTreatment":0,"RegularPartner":0,"RelievingFactors":0,"Rhinitis":0,"SOB":0,"SOBWork":0,"SafeSex":0,"SeafoodAllergy":0,"SeasonVariation":0,"Severity":0,"SexType":0,"Site":0,"SitePast":0,"SkinChange":0,"SmallTalk":1,"Smoke":0,"Sleep":0,"Sneezing":0,"SOBExert":0,"SOBExertion":0,"SOBVariation":0,"Sputum":0,"SputumAmount":0,"SputumColour":0,"StoolBulk":0,"StoolConsistency":0,"StoolDescribe":0,"StoolFloat":0,"StoolMucus":0,"StoolSmell":0,"StressIncontinence":0,"Summary":0,"SurgeryPast":0,"Sweating":0,"Tenesmus":0,"TermDelivery":0,"Timing":0,"TimingPast":0,"TransitionPoints":0,"TravelHx":0,"Urgency":0,"Vomit":0,"WeightLoss":0,"WhatProblem":1,"Wheeze":0,"WheezeWork":0,"ask_rephrase":0,"backtrack":0,"default":0,"Palpitations":0,"PillowSleep":0,"MasonryExposure":0,"ConstructionExposure":0,"CeramicsExposure":0,"Arrhythmia":0,"Anxiety":0,"Stress":0}
2	0	5	{"ADLs":0,"AbdoCramps":0,"AbdoDistention":0,"AbdoPain":0,"Accommodation":0,"Age":0,"Alcohol":0,"AllergyHx":0,"AnimalAllergy":0,"AntiSickness":0,"Appendicectomy":0,"Appetite":0,"AsbestosExposure":0,"Ascites":0,"AssociatedFactors":0,"AssociatedFactorsPast":0,"BarleyExposure":0,"BeeWaspStingAllergy":0,"BerylliumExposure":0,"BirdAllergy":0,"Bloatedness":0,"BloodyStool":0,"BowelFrequency":0,"BowelHabit":0,"BowelIncontinence":0,"BowelMotions":0,"CasualPartner":0,"CheckDrug":0,"Character":0,"ChestPain":0,"Cholecystectomy":0,"CoalExposure":0,"ColdWeatherExacerbation":0,"Colonoscopy":0,"Concern":0,"ConfirmName":0,"ConfirmProblem":0,"Constipation":0,"Contacts":0,"CottonExposure":0,"Cough":0,"DIabetes":0,"DOB":0,"DampHome":0,"DarkUrine":0,"Delivery":0,"Diarrhea":0,"Diet":0,"DiagnosticStatement":0,"Diarrhoea":0,"DoctorQuestion":0,"DrugAbuse":0,"DrugHx":0,"DustExposure":0,"Dyspepsia":0,"Dysphagia":0,"EggAllergy":0,"Empathy":0,"EnvironmentChangeHouse":0,"ExacerbatingFactors":0,"Exercise":0,"ExerciseToleranceNorm":0,"ExerciseToleranceNow":0,"Expectations":0,"FamilyHx":0,"FamilyMember":0,"FarmingExposure":0,"Fever":0,"FoodAllergy":0,"Frequency":0,"FrequencyUrine":0,"Followup":"Introduction","GORD":0,"Gastritis":0,"Goodbye":0,"Haematemesis":0,"Haemoptysis":0,"HaemoptysisMixedStreak":0,"Hayfever":0,"Heart attack":0,"HerniaOp":0,"HiatusHernia":0,"Hoarseness":0,"Hobbies":0,"Ideas":0,"IVDU":0,"IndustrialExposure":0,"IntroAndName":0,"Introduction":1,"ItchyEyesNoseThroat":0,"Jaundice":0,"LUTOpen":0,"Lethargy":0,"Lifestyle":0,"ManagementPlan":0,"MushroomExposure":0,"Name":0,"NameAndDOB ":0,"NameAndAge":0,"Nausea":0,"NeuroSOB":0,"NewWorkConditions":0,"NewLivingConditions":0,"Nocturia":0,"NutsAllergy":0,"OGD":0,"OTCDrugHx":0,"Occupation":0,"Odynophagia":0,"Onset":0,"OnsetTrigger":0,"Orthopnoea":0,"OtherProblems":0,"PND":0,"PUD":0,"PainKiller":0,"PainfulDefecation":0,"PaleStool":0,"Partner":0,"PassiveSmoke":0,"PassiveSmokeContact":0,"PastMedicalHx":0,"PastSurgicalHx":0,"PeripheralOedema":0,"PetsExposure":0,"Piles":0,"PillowsSleep":0,"PollenAllergy":0,"PreviousICU":0,"PreviousTransfusions":0,"ProblemBefore":0,"ProblemProgression":0,"ProblemStart":0,"PrutitisAni":0,"PrutitisSkin":0,"ProblemStartPast":0,"PruritisAni":0,"PruritisSkin":0,"Radiation":0,"RadiationPast":0,"Reassurance":0,"RecentTreatment":0,"RegularPartner":0,"RelievingFactors":0,"Rhinitis":0,"SOB":0,"SOBWork":0,"SafeSex":0,"SeafoodAllergy":0,"SeasonVariation":0,"Severity":0,"SexType":0,"Site":0,"SitePast":0,"SkinChange":0,"SmallTalk":0,"Smoke":0,"Sleep":0,"Sneezing":0,"SOBExert":0,"SOBExertion":0,"SOBVariation":0,"Sputum":0,"SputumAmount":0,"SputumColour":0,"StoolBulk":0,"StoolConsistency":0,"StoolDescribe":0,"StoolFloat":0,"StoolMucus":0,"StoolSmell":0,"StressIncontinence":0,"Summary":0,"SurgeryPast":0,"Sweating":0,"Tenesmus":0,"TermDelivery":0,"Timing":0,"TimingPast":0,"TransitionPoints":0,"TravelHx":0,"Urgency":0,"Vomit":0,"WeightLoss":0,"WhatProblem":0,"Wheeze":0,"WheezeWork":0,"ask_rephrase":0,"backtrack":0,"default":0,"Palpitations":0,"PillowSleep":0,"MasonryExposure":0,"ConstructionExposure":0,"CeramicsExposure":0,"Arrhythmia":0,"Anxiety":0,"Stress":0}
\.


--
-- Data for Name: users_cases_notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_cases_notes (id, user_id, case_id, note) FROM stdin;
1	16	6	Hi there dude
2	16	7	Just writing a note here dude. nothing else
3	16	7	Just writing a note here dude. nothing else
4	0	5	hyy
5	16	8	<p>haadhashd</p>
6	16	8	<p><strong>asdasd asd asd asd asd&nbsp;</strong></p><figure class="table"><table><tbody><tr><td>asdasd</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>
7	16	8	<p><a href="http://youtube.com">test</a></p>
8	16	8	<p>asdadasdadad</p>
9	16	8	<h4>asdad</h4>
10	16	8	<p><strong>hiii world</strong></p>
\.


--
-- Data for Name: users_cases_steps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_cases_steps (id, case_id, user_id, session_id, step) FROM stdin;
11	5	16	26	1
12	5	16	26	10
13	8	16	26	1
14	8	16	26	10
15	8	16	27	3
16	8	16	27	5
17	8	16	27	6
18	8	16	27	4
19	8	16	27	1
20	8	16	27	2
21	8	16	27	3
22	8	16	27	1
23	8	16	27	2
24	8	16	27	3
25	8	16	27	2
26	8	16	27	17
27	8	16	27	18
28	8	16	27	3
29	8	16	27	5
30	8	16	27	3
31	8	16	27	5
32	8	16	27	3
33	8	16	27	4
34	8	16	27	19
35	8	16	27	3
36	8	16	27	4
37	8	16	27	4
38	8	16	27	3
39	8	16	27	6
40	8	16	27	7
41	6	0	31	3
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
31	0	5	i need help	f	2021-03-31 13:11:27.68759	15	
33	0	5	give me some medication	f	2021-03-31 13:11:37.272722	15	
34	0	5	 When I get the symptoms, I really struggle for breath. I start to huff and puff, and can't do much around the house at all. It is scary when it gets that bad...but then it improves again.	f	2021-03-31 13:11:38.908725	15	Severity
32	0	5	I am not able to understand your question!	f	2021-03-31 13:11:29.996941	15	NA
35	0	5	something is not right	f	2021-03-31 13:12:48.909006	15	
36	0	5	 Yes.	f	2021-03-31 13:12:50.891623	15	Summary
37	0	5	okay we need to change something	f	2021-03-31 13:13:02.407814	15	
38	0	5	No, I have been with the same office now for at least 10 years.	f	2021-03-31 13:13:04.408508	15	NewWorkConditions
39	0	5	sweet	f	2021-03-31 13:15:51.850747	15	
40	0	5	 No.	f	2021-03-31 13:15:54.090877	15	PreviousTransfusions
41	0	5	whattttt	f	2021-03-31 13:15:57.764506	15	
42	0	5	Thank you for your time.  I wish I didn't need to come and see you today!	f	2021-03-31 13:15:59.748079	15	SmallTalk
43	0	5	i need help	f	2021-03-31 13:16:09.213584	15	
44	0	5	I am not able to understand your question!	f	2021-03-31 13:16:11.154738	15	NA
45	0	5	kamehameha	f	2021-03-31 13:16:22.5455	15	
46	0	5	 I am Ms Judith Palfrey.	f	2021-03-31 13:16:24.604455	15	Name
47	0	5	what is your name	f	2021-03-31 13:16:32.53766	15	
48	0	5	 I am Ms Judith Palfrey.	f	2021-03-31 13:16:34.943123	15	Name
49	0	5	how are you today	f	2021-03-31 13:16:40.227001	15	
50	0	5	Thank you for your time.  I wish I didn't need to come and see you today!	f	2021-03-31 13:16:42.623784	15	SmallTalk
51	0	5	how are you today?	f	2021-03-31 13:16:52.700834	15	
52	0	5	 Thanks for seeing me today - You know how it is... it's always a rush to fit in everything in the day.	f	2021-03-31 13:16:55.072246	15	SmallTalk
53	0	5	okay	f	2021-03-31 13:19:20.482916	15	
54	0	5	I am not able to understand your question!	f	2021-03-31 13:19:22.678345	15	NA
55	0	5	speak something	f	2021-03-31 13:20:02.189439	15	
56	0	5	I am not able to understand your question!	f	2021-03-31 13:20:04.377057	15	NA
57	0	5	asdasd	f	2021-03-31 13:21:27.983027	15	
58	0	5	I am not able to understand your question!	f	2021-03-31 13:21:30.528848	15	NA
59	0	5	asd	f	2021-03-31 13:22:27.184928	15	
60	0	5	I am not able to understand your question!	f	2021-03-31 13:22:29.464372	15	NA
61	0	5	hey	f	2021-03-31 13:26:33.222035	15	
62	0	5	I am not able to understand your question!	f	2021-03-31 13:26:35.587697	15	NA
63	0	5	i need medication	f	2021-03-31 13:44:02.506588	15	
64	0	5	 Nothing regularly. But my doctor has started me on a blue inhaler to see if it will help.	f	2021-03-31 13:44:04.264512	15	DrugHx
65	0	5	what is your name	f	2021-03-31 13:44:38.844036	15	
66	0	5	 I am Ms Judith Palfrey.	f	2021-03-31 13:44:40.605139	15	Name
67	0	5	nice work	f	2021-03-31 13:48:56.623266	15	
68	0	5	No, I am a veteran at my office!	f	2021-03-31 13:48:58.310585	15	NewWorkConditions
69	0	5	how you doing	f	2021-03-31 13:53:26.78155	15	
70	0	5	 Thanks for seeing me today - You know how it is... it's always a rush to fit in everything in the day.	f	2021-03-31 13:53:28.378647	15	SmallTalk
71	0	5	i am looking for a job	f	2021-03-31 13:54:00.627207	15	
72	0	5	 I am a legal secretary	f	2021-03-31 13:54:02.690253	15	Occupation
73	0	5	dont you have something better to do	f	2021-03-31 13:54:12.429772	15	
74	0	5	 Okay, sure.	f	2021-03-31 13:54:14.434623	15	TransitionPoints
75	0	5	atta boy	f	2021-03-31 13:54:19.902648	15	
76	0	5	I am not able to understand your question!	f	2021-03-31 13:54:21.934173	15	NA
77	0	5	i need medication	f	2021-04-09 13:56:34.315957	15	
78	0	5	 Nothing regularly. But my doctor has started me on a blue inhaler to see if it will help.	f	2021-04-09 13:56:36.430017	15	DrugHx
79	0	5	whats up	f	2021-04-09 13:56:52.197373	15	
80	0	5	Thank you for your time.  I wish I didn't need to come and see you today!	f	2021-04-09 13:56:53.674367	15	SmallTalk
81	0	5	lets talk	f	2021-04-09 14:01:21.070591	15	
82	0	5	I must admit that I do not exercise much normally - but now I am afraid of getting breathless, so I am actively avoiding all exercise.	f	2021-04-09 14:01:23.006296	15	Exercise
83	0	5	how are you	f	2021-04-09 14:01:47.202533	15	
84	0	5	Thank you for your time.  I wish I didn't need to come and see you today!	f	2021-04-09 14:01:49.114408	15	SmallTalk
85	0	5	i am fine	f	2021-04-09 14:02:21.05493	15	
86	0	5	 I am Ms Judith Palfrey.	f	2021-04-09 14:02:22.950538	15	Name
87	0	5	hey Hawa	f	2021-04-17 16:42:08.529198	15	
88	0	5	I am not able to understand your question!	f	2021-04-17 16:42:10.974117	15	NA
89	0	5	ok	f	2021-04-17 16:42:18.718356	15	
90	0	5	I am not able to understand your question!	f	2021-04-17 16:42:21.013665	15	NA
91	0	5	extra space WhatsApp per uthaunga	f	2021-04-17 16:42:28.885542	15	
92	0	5	I am not able to understand.	f	2021-04-17 16:42:31.038877	15	NA
93	0	5	what is up with you	f	2021-04-17 17:04:54.710227	16	
94	0	5	I am not able to understand your question!	f	2021-04-17 17:04:56.796147	16	NA
30	0	6	 Thank you for your kind words doctor.	f	2021-01-16 23:01:10.346278	4	Empathy
95	0	5	hey whats up	f	2021-04-17 17:32:07.087203	17	
96	0	5	 Thanks for seeing me today - You know how it is... it's always a rush to fit in everything in the day.	f	2021-04-17 17:32:09.096759	17	SmallTalk
97	0	5	hi doctor	f	2021-04-17 17:43:19.574172	18	
98	0	5	 Hello Doctor. Nice to meet you.	f	2021-04-17 17:43:21.712466	18	Introduction
99	0	5	i am sure everything is good right now	f	2021-04-17 17:43:45.405586	18	
100	0	5	Yes, taking in the crisp outdoors air can at times be helpful.	f	2021-04-17 17:43:47.411499	18	RelievingFactors
101	0	5	okay great	f	2021-04-17 17:44:11.119489	18	
102	0	5	I am not able to understand your question!	f	2021-04-17 17:44:13.214298	18	NA
103	0	5	okay so what is next	f	2021-04-17 17:44:51.594847	18	
104	0	5	 My family doctor has sent me to you because he couldn't help treat my shortness of breath.	f	2021-04-17 17:44:54.059454	18	WhatProblem
105	0	5	where do you live	f	2021-04-17 19:25:42.227701	19	
106	0	5	I live in my house that I rent	f	2021-04-17 19:25:44.496605	19	Accommodation
107	0	5	do you pay rent	f	2021-04-17 19:25:57.792724	19	
108	0	5	I am not able to understand your question!	f	2021-04-17 19:25:59.85319	19	NA
109	0	5	where do you live	f	2021-04-17 19:26:05.974534	19	
110	0	5	Yes	f	2021-04-17 19:26:08.450716	19	Accommodation
111	0	5	where do you live	f	2021-04-17 19:26:14.950077	19	
112	0	5	I live in my house that I rent	f	2021-04-17 19:26:17.768968	19	Accommodation
113	0	5	where do you live	f	2021-04-17 19:26:27.965641	19	
114	0	5	I live in my house that I rent	f	2021-04-17 19:26:30.468036	19	Accommodation
115	0	5	where do you live	f	2021-04-17 19:26:35.953101	19	
116	0	5	I live in a house	f	2021-04-17 19:26:38.45029	19	Accommodation
117	0	5	Do you have Ascites	f	2021-04-17 19:26:46.729996	19	
118	0	5	 No.	f	2021-04-17 19:26:49.309102	19	Ascites
119	0	5	What are your associated factors	f	2021-04-17 19:27:01.000794	19	
120	0	5	 No	f	2021-04-17 19:27:03.643287	19	CottonExposure
121	0	5	Do you take drugs?	f	2021-04-17 19:27:15.251864	19	
122	0	5	 No	f	2021-04-17 19:27:17.774722	19	DrugAbuse
123	0	5	Do you take drugs?	f	2021-04-17 19:27:22.826872	19	
124	0	5	 No	f	2021-04-17 19:27:25.756328	19	DrugAbuse
125	0	5	Do you have chest pain	f	2021-04-17 19:27:33.014451	19	
126	0	5	No. I don't get any chest pain	f	2021-04-17 19:27:35.545292	19	ChestPain
127	0	5	do you have any Concern	f	2021-04-17 19:27:49.022462	19	
128	0	5	No	f	2021-04-17 19:27:52.070918	19	Cough
129	0	5	confirm your name	f	2021-04-17 19:28:02.532594	19	
130	0	5	My name is Amjad Khan	f	2021-04-17 19:28:05.283192	19	Name
131	0	5	are you sure	f	2021-04-17 19:28:13.757115	19	
132	0	5	I am not able to understand your question!	f	2021-04-17 19:28:16.566432	19	NA
133	0	5	Diagnostic Statement	f	2021-04-17 19:28:26.510042	19	
134	0	5	I am not able to understand your question!	f	2021-04-17 19:28:29.560046	19	NA
135	0	5	do you Exercise	f	2021-04-17 19:28:35.887411	19	
136	0	5	Not as much as I should be. I used to walk twice every week in local park but can't even do that anymore	f	2021-04-17 19:28:39.019064	19	Exercise
137	0	5	what are your hobbies	f	2021-04-17 19:28:55.647168	19	
138	0	5	I spend time with my family	f	2021-04-17 19:28:58.47615	19	Hobbies
139	0	5	hi how are you	f	2021-04-19 09:47:28.776309	19	
140	0	5	I am okay doctor, just my legs bothering me	f	2021-04-19 09:47:31.422111	19	SmallTalk
141	0	5	what did you eat today	f	2021-04-19 09:47:42.645299	19	
142	0	5	My wife keeps telling me to eat less salty foods	f	2021-04-19 09:47:44.619531	19	Diet
143	0	5	hai	f	2021-04-20 14:37:15.373305	21	
144	0	5	I am not able to understand your question!	f	2021-04-20 14:37:17.487423	21	NA
145	0	5	whats going on	f	2021-04-20 14:38:12.089489	22	
146	0	5	My legs have been just really swollen for a few weeks now. It has me a little worried	f	2021-04-20 14:38:13.599918	22	WhatProblem
147	0	5	hello	f	2021-04-20 14:39:38.88417	23	
148	0	5	Hello doctor	f	2021-04-20 14:39:40.843107	23	Introduction
149	0	5	hello	f	2021-04-20 14:40:01.88248	23	
150	0	5	Hello	f	2021-04-20 14:40:03.575709	23	Introduction
151	0	5	your name	f	2021-04-20 14:40:18.106884	23	
152	0	5	Amjad Khan	f	2021-04-20 14:40:20.069988	23	Name
153	0	5	tell me something about your character	f	2021-04-20 14:43:33.915474	23	
154	0	5	 I have noticed my legs have become quite swollen	f	2021-04-20 14:43:35.759633	23	WhatProblem
155	0	5	did you take any drugs?	f	2021-04-20 14:43:52.81022	23	
156	0	5	 No	f	2021-04-20 14:43:59.636763	23	DrugAbuse
157	0	5	did I give you any medicine	f	2021-04-20 14:44:12.650594	23	
158	0	5	Sorry, I don't know	f	2021-04-20 14:44:14.698886	23	PastMedicalHx
159	0	5	why not	f	2021-04-20 14:44:24.439972	23	
160	0	5	I am not able to understand your question!	f	2021-04-20 14:44:26.532202	23	NA
161	0	5	hi how	f	2021-04-20 15:09:36.061991	24	
162	0	5	I am okay doctor, just my legs bothering me	f	2021-04-20 15:09:38.141814	24	SmallTalk
163	0	5	hi how are you doing	f	2021-04-20 15:09:51.625455	24	
164	0	5	I am okay doctor, just my legs bothering me	f	2021-04-20 15:09:53.549584	24	SmallTalk
165	0	5	what is your name	f	2021-04-20 15:10:21.164031	24	
166	0	5	Amjad Khan	f	2021-04-20 15:10:23.142664	24	Name
167	0	5	did you take a medication	f	2021-04-20 15:10:47.253496	24	
168	0	5	did you take a medication	f	2021-04-20 15:10:47.29061	24	
169	0	5	I am on a few tablets and also insulin. I'll give you my prescription because I can never remember all the names	f	2021-04-20 15:10:49.260904	24	DrugHx
170	0	5	I am on a few tablets and also insulin. I'll give you my prescription because I can never remember all the names	f	2021-04-20 15:10:49.433552	24	DrugHx
171	0	5	so what's next	f	2021-04-20 15:11:37.766779	24	
172	0	5	My legs have been just really swollen for a few weeks now. It has me a little worried	f	2021-04-20 15:11:39.753022	24	WhatProblem
173	0	5	what is your name	f	2021-04-20 15:13:05.644289	24	
174	0	5	Amjad Khan	f	2021-04-20 15:13:07.714931	24	Name
175	0	5	what is your name	f	2021-04-20 15:25:08.780464	25	
176	0	5	My name is Amjad Khan	f	2021-04-20 15:25:11.285561	25	Name
177	0	5	what is your name	f	2021-04-20 15:25:19.521894	25	
178	0	5	Amjad Khan	f	2021-04-20 15:25:21.848527	25	Name
179	0	5	Video dekh	f	2021-04-20 15:25:30.51245	25	
180	0	5	I am not able to understand your question!	f	2021-04-20 15:25:32.711724	25	NA
181	16	8	wierd	f	2021-05-10 23:47:27.653364	26	
182	0	8	I am not able to understand your question!	f	2021-05-10 23:47:29.628617	26	NA
183	16	8	Hi	f	2021-05-20 09:50:21.843362	27	
185	16	8	how are you today	f	2021-05-20 09:50:30.445841	27	
187	16	8	is everthing okay	f	2021-05-20 09:50:43.955558	27	
188	0	8	I am not able to understand your question!	f	2021-05-20 09:50:45.924772	27	NA
189	16	8	hai	f	2021-05-20 09:54:54.129139	27	
190	0	8	I am not able to understand your question!	f	2021-05-20 09:54:55.926966	27	NA
186	0	8	I am okay doctor, just my legs bothering me	f	2021-05-20 09:50:32.103788	27	SmallTalk
184	0	8	Hello doctor	f	2021-05-20 09:50:24.2505	27	Introduction
191	16	8	sweet	f	2021-05-20 10:48:37.517524	27	
192	0	8	 No.	f	2021-05-20 10:48:39.091431	27	PreviousTransfusions
193	16	8	what are you upto	f	2021-05-20 11:25:51.069971	27	
194	0	8	I am okay doctor, just my legs bothering me	f	2021-05-20 11:25:52.816511	27	SmallTalk
195	16	8	okay	f	2021-05-20 11:26:07.254749	27	
196	0	8	I am not able to understand your question!	f	2021-05-20 11:26:08.966708	27	NA
197	16	8	got it	f	2021-05-20 11:28:41.636147	27	
198	0	8	I am not able to understand your question!	f	2021-05-20 11:28:43.620456	27	NA
199	16	8	is it working	f	2021-05-20 13:12:39.423933	27	
200	0	8	 No	f	2021-05-20 13:12:41.182846	27	SOBWork
201	16	8	did it work	f	2021-05-20 13:12:52.849542	27	
202	0	8	I'm retired now but worked as a Taxi driver	f	2021-05-20 13:12:54.452804	27	Occupation
203	16	8	or not	f	2021-05-20 13:12:59.851054	27	
204	0	8	My name is Amjad Khan	f	2021-05-20 13:13:01.621348	27	Name
205	16	8	okay how about now	f	2021-05-20 13:13:14.459636	27	
206	0	8	I get the breathing problem when I lie flat	f	2021-05-20 13:13:16.348972	27	Onset
207	16	8	gggggggggggggg	f	2021-05-20 13:49:53.163966	27	
208	0	8	I get the breathing problem when I lie flat	f	2021-05-20 13:49:55.018854	27	OnsetTrigger
209	16	8	he;;p	f	2021-05-20 13:51:49.697481	27	
210	0	8	I am not able to understand your question!	f	2021-05-20 13:51:51.448721	27	NA
211	16	8	test	f	2021-05-20 13:54:22.672696	27	
212	0	8	 No	f	2021-05-20 13:54:24.486902	27	PetsExposure
213	16	8	test	f	2021-05-20 13:57:41.654678	27	
214	0	8	 No	f	2021-05-20 13:57:43.663827	27	PetsExposure
215	16	8	wierd	f	2021-05-20 13:58:18.234785	27	
216	0	8	I am not able to understand your question!	f	2021-05-20 13:58:20.237038	27	NA
217	0	6	hello	f	2021-05-26 15:00:30.223759	28	
218	0	6	hello	f	2021-05-26 15:23:58.791024	28	
219	0	6	hello	f	2021-05-26 15:44:05.751608	32	
220	0	5	hello	f	2021-05-27 06:04:27.368306	33	
221	0	6	hello	f	2021-05-27 07:37:54.858217	31	
222	0	6	Good morning	f	2021-05-27 07:37:56.205669	31	Introduction
223	0	6	how are you	f	2021-05-27 07:38:05.832852	31	
224	0	6	Thank you for your time.  I wish I didn't need to come and see you today!	f	2021-05-27 07:38:07.111677	31	SmallTalk
225	0	6	but why you say this	f	2021-05-27 07:40:16.387941	31	
226	0	6	I have been quite breathless and my regular doctor couldn't help.	f	2021-05-27 07:40:17.899198	31	WhatProblem
227	0	6	hello	f	2021-05-27 08:08:37.628209	31	
228	0	6	Hello	f	2021-05-27 08:08:39.283079	31	Introduction
229	0	6	hello	f	2021-05-27 08:09:04.285282	31	
230	0	6	Hi	f	2021-05-27 08:09:05.820121	31	Introduction
231	0	7	hello	f	2021-05-27 08:26:46.560606	31	
232	0	6	what is your name	f	2021-05-27 08:28:13.550816	31	
233	0	6	I am Ms Judith Palfrey	f	2021-05-27 08:28:14.825899	31	Name
234	0	6	hello	f	2021-05-27 08:32:17.647234	31	
235	0	6	Good morning	f	2021-05-27 08:32:18.884604	31	Introduction
236	0	5	hello	f	2021-05-27 16:17:20.375656	34	
237	0	5	Good morning	f	2021-05-27 16:17:21.570386	34	Introduction
\.


--
-- Name: cases_diagnosis_result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cases_diagnosis_result_id_seq', 1, false);


--
-- Name: cases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cases_id_seq', 8, true);


--
-- Name: cases_steps_result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cases_steps_result_id_seq', 1, false);


--
-- Name: diagnosis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.diagnosis_id_seq', 1173, true);


--
-- Name: steps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.steps_id_seq', 20, true);


--
-- Name: user_cases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_cases_id_seq', 35, true);


--
-- Name: users_cases_diagnosis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_cases_diagnosis_id_seq', 99, true);


--
-- Name: users_cases_intents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_cases_intents_id_seq', 3, true);


--
-- Name: users_cases_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_cases_notes_id_seq', 10, true);


--
-- Name: users_cases_steps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_cases_steps_id_seq', 41, true);


--
-- Name: users_cases_support_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_cases_support_id_seq', 237, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 26, true);


--
-- Name: cases_diagnosis_result cases_diagnosis_result_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cases_diagnosis_result
    ADD CONSTRAINT cases_diagnosis_result_pkey PRIMARY KEY (id);


--
-- Name: cases cases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cases
    ADD CONSTRAINT cases_pkey PRIMARY KEY (id);


--
-- Name: cases_steps_result cases_steps_result_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cases_steps_result
    ADD CONSTRAINT cases_steps_result_pkey PRIMARY KEY (id);


--
-- Name: diagnosis diagnosis_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diagnosis
    ADD CONSTRAINT diagnosis_name_key UNIQUE (name);


--
-- Name: diagnosis diagnosis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diagnosis
    ADD CONSTRAINT diagnosis_pkey PRIMARY KEY (id);


--
-- Name: steps steps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.steps
    ADD CONSTRAINT steps_pkey PRIMARY KEY (id);


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
-- Name: users_cases_steps users_cases_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_steps
    ADD CONSTRAINT users_cases_steps_pkey PRIMARY KEY (id);


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
-- Name: users_cases_intents case_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_intents
    ADD CONSTRAINT case_id FOREIGN KEY (case_id) REFERENCES public.cases(id);


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
-- Name: users_cases_intents user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_cases_intents
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

