PGDMP                          y         
   humaine_v5    13.2    13.1 Q    3           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            4           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            5           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            6           1262    24793 
   humaine_v5    DATABASE     U   CREATE DATABASE humaine_v5 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE humaine_v5;
                akashsmaranmajety    false            �            1259    24794    cases    TABLE     Y  CREATE TABLE public.cases (
    id integer NOT NULL,
    case_name character varying(255) NOT NULL,
    case_description text,
    case_status character varying(15),
    case_difficulty character varying(15),
    case_created timestamp with time zone DEFAULT timezone('UTC'::text, CURRENT_TIMESTAMP),
    image text,
    case_department text
);
    DROP TABLE public.cases;
       public         heap    akashsmaranmajety    false            �            1259    24801    cases_diagnosis_result    TABLE     �   CREATE TABLE public.cases_diagnosis_result (
    id integer NOT NULL,
    case_id integer NOT NULL,
    diagnosis_id integer NOT NULL
);
 *   DROP TABLE public.cases_diagnosis_result;
       public         heap    akashsmaranmajety    false            �            1259    24804    cases_diagnosis_result_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cases_diagnosis_result_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.cases_diagnosis_result_id_seq;
       public          akashsmaranmajety    false    201            7           0    0    cases_diagnosis_result_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.cases_diagnosis_result_id_seq OWNED BY public.cases_diagnosis_result.id;
          public          akashsmaranmajety    false    202            �            1259    24806    cases_id_seq    SEQUENCE     �   ALTER TABLE public.cases ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          akashsmaranmajety    false    200            �            1259    24808    cases_steps_result    TABLE     �   CREATE TABLE public.cases_steps_result (
    id integer NOT NULL,
    case_id integer NOT NULL,
    step_id integer NOT NULL
);
 &   DROP TABLE public.cases_steps_result;
       public         heap    akashsmaranmajety    false            �            1259    24811    cases_steps_result_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cases_steps_result_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.cases_steps_result_id_seq;
       public          akashsmaranmajety    false    204            8           0    0    cases_steps_result_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.cases_steps_result_id_seq OWNED BY public.cases_steps_result.id;
          public          akashsmaranmajety    false    205            �            1259    24813 	   diagnosis    TABLE     d   CREATE TABLE public.diagnosis (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);
    DROP TABLE public.diagnosis;
       public         heap    akashsmaranmajety    false            �            1259    24816    diagnosis_id_seq    SEQUENCE     �   CREATE SEQUENCE public.diagnosis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.diagnosis_id_seq;
       public          akashsmaranmajety    false    206            9           0    0    diagnosis_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.diagnosis_id_seq OWNED BY public.diagnosis.id;
          public          akashsmaranmajety    false    207            �            1259    24818    steps    TABLE     F   CREATE TABLE public.steps (
    id integer NOT NULL,
    name text
);
    DROP TABLE public.steps;
       public         heap    akashsmaranmajety    false            �            1259    24824    steps_id_seq    SEQUENCE     �   CREATE SEQUENCE public.steps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.steps_id_seq;
       public          akashsmaranmajety    false    208            :           0    0    steps_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.steps_id_seq OWNED BY public.steps.id;
          public          akashsmaranmajety    false    209            �            1259    24826 
   user_cases    TABLE     �   CREATE TABLE public.user_cases (
    id integer NOT NULL,
    case_id integer,
    user_id integer,
    status text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    stopped_at timestamp without time zone
);
    DROP TABLE public.user_cases;
       public         heap    akashsmaranmajety    false            �            1259    24833    user_cases_id_seq    SEQUENCE     �   ALTER TABLE public.user_cases ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_cases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          akashsmaranmajety    false    210            �            1259    24835    users    TABLE     /  CREATE TABLE public.users (
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
    DROP TABLE public.users;
       public         heap    akashsmaranmajety    false            �            1259    24842    users_cases_diagnosis    TABLE     �   CREATE TABLE public.users_cases_diagnosis (
    id integer NOT NULL,
    user_id integer,
    case_id integer,
    diagnosis integer NOT NULL,
    session_id integer NOT NULL
);
 )   DROP TABLE public.users_cases_diagnosis;
       public         heap    akashsmaranmajety    false            �            1259    24845    users_cases_diagnosis_id_seq    SEQUENCE     �   ALTER TABLE public.users_cases_diagnosis ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_cases_diagnosis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          akashsmaranmajety    false    213            �            1259    24847    users_cases_notes    TABLE     �   CREATE TABLE public.users_cases_notes (
    id integer NOT NULL,
    user_id integer,
    case_id integer,
    note text NOT NULL
);
 %   DROP TABLE public.users_cases_notes;
       public         heap    akashsmaranmajety    false            �            1259    24853    users_cases_notes_id_seq    SEQUENCE     �   ALTER TABLE public.users_cases_notes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_cases_notes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          akashsmaranmajety    false    215            �            1259    24855    users_cases_steps    TABLE     �   CREATE TABLE public.users_cases_steps (
    id integer NOT NULL,
    case_id integer NOT NULL,
    user_id integer NOT NULL,
    session_id integer NOT NULL,
    step integer NOT NULL
);
 %   DROP TABLE public.users_cases_steps;
       public         heap    akashsmaranmajety    false            �            1259    24858    users_cases_steps_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_cases_steps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.users_cases_steps_id_seq;
       public          akashsmaranmajety    false    217            ;           0    0    users_cases_steps_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.users_cases_steps_id_seq OWNED BY public.users_cases_steps.id;
          public          akashsmaranmajety    false    218            �            1259    24860    users_cases_support    TABLE     6  CREATE TABLE public.users_cases_support (
    id integer NOT NULL,
    user_id integer,
    case_id integer,
    comment text NOT NULL,
    is_flagged boolean,
    comment_created timestamp without time zone DEFAULT timezone('UTC'::text, CURRENT_TIMESTAMP),
    session_id integer NOT NULL,
    intent text
);
 '   DROP TABLE public.users_cases_support;
       public         heap    akashsmaranmajety    false            �            1259    24867    users_cases_support_id_seq    SEQUENCE     �   ALTER TABLE public.users_cases_support ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_cases_support_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          akashsmaranmajety    false    219            �            1259    24869    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          akashsmaranmajety    false    212            <           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          akashsmaranmajety    false    221            n           2604    24871    cases_diagnosis_result id    DEFAULT     �   ALTER TABLE ONLY public.cases_diagnosis_result ALTER COLUMN id SET DEFAULT nextval('public.cases_diagnosis_result_id_seq'::regclass);
 H   ALTER TABLE public.cases_diagnosis_result ALTER COLUMN id DROP DEFAULT;
       public          akashsmaranmajety    false    202    201            o           2604    24872    cases_steps_result id    DEFAULT     ~   ALTER TABLE ONLY public.cases_steps_result ALTER COLUMN id SET DEFAULT nextval('public.cases_steps_result_id_seq'::regclass);
 D   ALTER TABLE public.cases_steps_result ALTER COLUMN id DROP DEFAULT;
       public          akashsmaranmajety    false    205    204            p           2604    24873    diagnosis id    DEFAULT     l   ALTER TABLE ONLY public.diagnosis ALTER COLUMN id SET DEFAULT nextval('public.diagnosis_id_seq'::regclass);
 ;   ALTER TABLE public.diagnosis ALTER COLUMN id DROP DEFAULT;
       public          akashsmaranmajety    false    207    206            q           2604    24874    steps id    DEFAULT     d   ALTER TABLE ONLY public.steps ALTER COLUMN id SET DEFAULT nextval('public.steps_id_seq'::regclass);
 7   ALTER TABLE public.steps ALTER COLUMN id DROP DEFAULT;
       public          akashsmaranmajety    false    209    208            t           2604    24875    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          akashsmaranmajety    false    221    212            u           2604    24876    users_cases_steps id    DEFAULT     |   ALTER TABLE ONLY public.users_cases_steps ALTER COLUMN id SET DEFAULT nextval('public.users_cases_steps_id_seq'::regclass);
 C   ALTER TABLE public.users_cases_steps ALTER COLUMN id DROP DEFAULT;
       public          akashsmaranmajety    false    218    217                      0    24794    cases 
   TABLE DATA           �   COPY public.cases (id, case_name, case_description, case_status, case_difficulty, case_created, image, case_department) FROM stdin;
    public          akashsmaranmajety    false    200   Wb                 0    24801    cases_diagnosis_result 
   TABLE DATA           K   COPY public.cases_diagnosis_result (id, case_id, diagnosis_id) FROM stdin;
    public          akashsmaranmajety    false    201   vc                 0    24808    cases_steps_result 
   TABLE DATA           B   COPY public.cases_steps_result (id, case_id, step_id) FROM stdin;
    public          akashsmaranmajety    false    204   �c       !          0    24813 	   diagnosis 
   TABLE DATA           -   COPY public.diagnosis (id, name) FROM stdin;
    public          akashsmaranmajety    false    206   d       #          0    24818    steps 
   TABLE DATA           )   COPY public.steps (id, name) FROM stdin;
    public          akashsmaranmajety    false    208   %�       %          0    24826 
   user_cases 
   TABLE DATA           Z   COPY public.user_cases (id, case_id, user_id, status, created_at, stopped_at) FROM stdin;
    public          akashsmaranmajety    false    210   �       '          0    24835    users 
   TABLE DATA           �   COPY public.users (id, email, password, name, title, institution, level_of_training, gender, country, date_of_birth, status, image) FROM stdin;
    public          akashsmaranmajety    false    212   ��       (          0    24842    users_cases_diagnosis 
   TABLE DATA           \   COPY public.users_cases_diagnosis (id, user_id, case_id, diagnosis, session_id) FROM stdin;
    public          akashsmaranmajety    false    213   ��       *          0    24847    users_cases_notes 
   TABLE DATA           G   COPY public.users_cases_notes (id, user_id, case_id, note) FROM stdin;
    public          akashsmaranmajety    false    215   D�       ,          0    24855    users_cases_steps 
   TABLE DATA           S   COPY public.users_cases_steps (id, case_id, user_id, session_id, step) FROM stdin;
    public          akashsmaranmajety    false    217   [�       .          0    24860    users_cases_support 
   TABLE DATA           }   COPY public.users_cases_support (id, user_id, case_id, comment, is_flagged, comment_created, session_id, intent) FROM stdin;
    public          akashsmaranmajety    false    219   ��       =           0    0    cases_diagnosis_result_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.cases_diagnosis_result_id_seq', 1, false);
          public          akashsmaranmajety    false    202            >           0    0    cases_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.cases_id_seq', 8, true);
          public          akashsmaranmajety    false    203            ?           0    0    cases_steps_result_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.cases_steps_result_id_seq', 1, false);
          public          akashsmaranmajety    false    205            @           0    0    diagnosis_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.diagnosis_id_seq', 1173, true);
          public          akashsmaranmajety    false    207            A           0    0    steps_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.steps_id_seq', 20, true);
          public          akashsmaranmajety    false    209            B           0    0    user_cases_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.user_cases_id_seq', 33, true);
          public          akashsmaranmajety    false    211            C           0    0    users_cases_diagnosis_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.users_cases_diagnosis_id_seq', 102, true);
          public          akashsmaranmajety    false    214            D           0    0    users_cases_notes_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.users_cases_notes_id_seq', 10, true);
          public          akashsmaranmajety    false    216            E           0    0    users_cases_steps_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.users_cases_steps_id_seq', 44, true);
          public          akashsmaranmajety    false    218            F           0    0    users_cases_support_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.users_cases_support_id_seq', 222, true);
          public          akashsmaranmajety    false    220            G           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 30, true);
          public          akashsmaranmajety    false    221            z           2606    24878 2   cases_diagnosis_result cases_diagnosis_result_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.cases_diagnosis_result
    ADD CONSTRAINT cases_diagnosis_result_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.cases_diagnosis_result DROP CONSTRAINT cases_diagnosis_result_pkey;
       public            akashsmaranmajety    false    201            x           2606    24880    cases cases_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.cases
    ADD CONSTRAINT cases_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.cases DROP CONSTRAINT cases_pkey;
       public            akashsmaranmajety    false    200            |           2606    24882 *   cases_steps_result cases_steps_result_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.cases_steps_result
    ADD CONSTRAINT cases_steps_result_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.cases_steps_result DROP CONSTRAINT cases_steps_result_pkey;
       public            akashsmaranmajety    false    204            ~           2606    24884    diagnosis diagnosis_name_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.diagnosis
    ADD CONSTRAINT diagnosis_name_key UNIQUE (name);
 F   ALTER TABLE ONLY public.diagnosis DROP CONSTRAINT diagnosis_name_key;
       public            akashsmaranmajety    false    206            �           2606    24886    diagnosis diagnosis_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.diagnosis
    ADD CONSTRAINT diagnosis_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.diagnosis DROP CONSTRAINT diagnosis_pkey;
       public            akashsmaranmajety    false    206            �           2606    24888    steps steps_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.steps
    ADD CONSTRAINT steps_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.steps DROP CONSTRAINT steps_pkey;
       public            akashsmaranmajety    false    208            �           2606    24890    user_cases user_cases_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_cases
    ADD CONSTRAINT user_cases_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_cases DROP CONSTRAINT user_cases_pkey;
       public            akashsmaranmajety    false    210            �           2606    24892 0   users_cases_diagnosis users_cases_diagnosis_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.users_cases_diagnosis
    ADD CONSTRAINT users_cases_diagnosis_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.users_cases_diagnosis DROP CONSTRAINT users_cases_diagnosis_pkey;
       public            akashsmaranmajety    false    213            �           2606    24894 (   users_cases_notes users_cases_notes_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.users_cases_notes
    ADD CONSTRAINT users_cases_notes_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.users_cases_notes DROP CONSTRAINT users_cases_notes_pkey;
       public            akashsmaranmajety    false    215            �           2606    24896 (   users_cases_steps users_cases_steps_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.users_cases_steps
    ADD CONSTRAINT users_cases_steps_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.users_cases_steps DROP CONSTRAINT users_cases_steps_pkey;
       public            akashsmaranmajety    false    217            �           2606    24898 ,   users_cases_support users_cases_support_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.users_cases_support
    ADD CONSTRAINT users_cases_support_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.users_cases_support DROP CONSTRAINT users_cases_support_pkey;
       public            akashsmaranmajety    false    219            �           2606    24900    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            akashsmaranmajety    false    212            �           2606    24902    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            akashsmaranmajety    false    212            �           2606    24903    user_cases fk_case    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_cases
    ADD CONSTRAINT fk_case FOREIGN KEY (case_id) REFERENCES public.cases(id) ON DELETE SET NULL;
 <   ALTER TABLE ONLY public.user_cases DROP CONSTRAINT fk_case;
       public          akashsmaranmajety    false    200    210    3192            �           2606    24908    users_cases_support fk_cases    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_cases_support
    ADD CONSTRAINT fk_cases FOREIGN KEY (case_id) REFERENCES public.cases(id) ON DELETE SET NULL;
 F   ALTER TABLE ONLY public.users_cases_support DROP CONSTRAINT fk_cases;
       public          akashsmaranmajety    false    219    200    3192            �           2606    24913    users_cases_notes fk_cases    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_cases_notes
    ADD CONSTRAINT fk_cases FOREIGN KEY (case_id) REFERENCES public.cases(id) ON DELETE SET NULL;
 D   ALTER TABLE ONLY public.users_cases_notes DROP CONSTRAINT fk_cases;
       public          akashsmaranmajety    false    200    3192    215            �           2606    24918    users_cases_diagnosis fk_cases    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_cases_diagnosis
    ADD CONSTRAINT fk_cases FOREIGN KEY (case_id) REFERENCES public.cases(id) ON DELETE SET NULL;
 H   ALTER TABLE ONLY public.users_cases_diagnosis DROP CONSTRAINT fk_cases;
       public          akashsmaranmajety    false    3192    200    213            �           2606    24923    user_cases fk_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_cases
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;
 <   ALTER TABLE ONLY public.user_cases DROP CONSTRAINT fk_user;
       public          akashsmaranmajety    false    212    3208    210            �           2606    24928    users_cases_support fk_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_cases_support
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;
 F   ALTER TABLE ONLY public.users_cases_support DROP CONSTRAINT fk_users;
       public          akashsmaranmajety    false    3208    219    212            �           2606    24933    users_cases_notes fk_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_cases_notes
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;
 D   ALTER TABLE ONLY public.users_cases_notes DROP CONSTRAINT fk_users;
       public          akashsmaranmajety    false    3208    212    215            �           2606    24938    users_cases_diagnosis fk_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_cases_diagnosis
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;
 H   ALTER TABLE ONLY public.users_cases_diagnosis DROP CONSTRAINT fk_users;
       public          akashsmaranmajety    false    3208    213    212                 x����N�0�s��ê��v�ځ!8p��nk�ƕ�����
��?v"���N�ٳ�/�{�!��t !Б�Fd����˾�V(��>���(4�&%�!vSȩ����k#ip�{G�Q#A���`�E>�y�p2���dZMlS����]�O��㝝��������gl�CT!I���C,�glI<j-�5E��37�<���E��_1���TO�C:�wR���+�������e��Y���?,�wY��D-E         <   x���� ����L/鿎(�=�B�`�f�{�ښ�]l%��smùD8�� Y�	?         0   x�3�4�4�2��\Ɯf��\&��\��@	3 i��Eb���� ���      !      x����v۸����:7���Q_�.�؉�m'ޑ;93kn(��ئHm~�Q^��y������/����3ku��*�B�¿
t���۷�jU&I�曳ћ��u�K�8�EY��A�'My�vg���}aB-1��l�c�J��l���*��mQ�� O7eJ�:!o�,���,�9]���`�MvT�˦���q��)k��|���iR�Cyr�-�JR{�]<8I(/�,.i��5�sȿ���F����Y�H�:�y�9)㺨�jp^z�#���U+v��$8�l��|U7%�xM���"KV~�V�Г��u�h��(�,�<9;���b��jy�4�1r�g��W���@�#k4��}������(��2����]봪)W�ꐯ%���א���J�$� ��u��3ɪF���n��2��:�/�:.�UͯLO�xe�]'�$���������_�F�cS���S��CZ�r���A�[Y�p��l�����٪@}�]Z5�k<�(�Bm��-�kF��$e'����b���y��2Bf��.�Ecd̲�ܠ�rK���%2�ƈ���f��t��k�$��M�]R�T8F��2;{}Iv��q2�cZ���N4l&4�oj��ل���`Sژ���jP�I�����L�� ��%j^'O�*M���׳���|I��9�FR�S!�֞Y��޺&�*f�r�JʳI�OiUi`O�]���ϦCW��)�;Pa�=d�7�?E4F#�J�
�Ҡ�q N%�7����׳��^��4I�I�]���#!6�{6��H�ɎR�J���t�{Ͱ��L�����Z���+֠�����8�I��L��Q�KQ�g3���4gjQc����`f�(�V\�m��`���<��lk��5'�A��ɱE�����[t��%0
ө��,�34Ze0����#�R�T���̘8��5�K��Y(�[Z���P���&�:2���h]8��[��ڦٺL���"�g/�=�y���g!��oͬ���'���vC�.����J���v5��"���B��-�h�
E�*���1�%#��D�
q7��g�ԗ�,s�iI�G��a�0�"=����Ѣ�!��iC��鿬U�5�H��l�V��	6�(�9-����A����8���	��.K�f����5
J�9\���us���W7��95��,��,��j���=�b6&�<�SQ��e7���";ز�jע�vͣ^�2��ә�����2Y�Y��o.�%k�0�a���V0����%f��es8��,�rm)N(>�-ՏA�B`��s8�T��n��V�a(B�)�߉ V�aI&CV��P����e�^6>T��5�ki�?���e���&uϤ����,Ɵ"�����Y��@�K��0"C5��]��y�_8c
 9�|=z�	�9Nr�͍�(��2���2+VhBME�+�nV��˃s�X���OߎTs��@�4���u� y>-�bc�J �U��T�wgw0�U-T��^�.ӽ���WQIZ��8 4P��*���p�"�9]���Z�m0��,g)�5(�5�� Zs\�/ \f	E����Ҿ�Z���� ��UxY� ��9����h0��(g`P�%Cj�E���V���q��jIVA�� eE��ԗ7t�^��'0(*u��|��,(�<�����c�� �8�$[X{y-�lUy�'+^J�?2@�I��*Ңɨ-�`�F�A�T��F�?�*��!Ν�&�����] �XcX��r��.M��Օ��\�bm��hZ���|tf�� W�9����P��j����xk�|	�qi?G?%�� ���";�5.�פ�6�O�y,�t�Yi�*��9X�>��<Y�P};=�4��12bS �Kl����(�6���	�(�C�т�}� H�)���Ei�,&8ĕ5�
��x#�c⩭Z��Am��S�sv�T�\սFE-���;����g�ka�p����0hyY��R�QKpkG8n�e"���?��o�'Ư��ĵ7��#��ck�C	_<'R(�¬#�;��2��Ö�*X��e�)F-�Iv��3��5oYY�LѰ-2yx3
�2�,ˆa���.�6���PM	[�YF���hҒ
�G�h�R\q��[2M4Z�B���&^�G�Dju�ͦP璙���@��4��{@���x ���/nfJfk'"V�U ����a 0ɻ��x߼���4�D�Q�T73�<�����R�I�+1*%@�u�`W��7�t�-�>޹��<��&�x2�����L�\B�u���n!��y�6t
����G/bh��p�Yoj#M<�%��ܺ�@X�k����ֱ����6y�9z�C�0���
�;M��P*r�� ���G�Q��萣�`��A��1�-��>���Q0nK�>В��p���A�d>΀p���<` ����a:�Bt$�bM@�#�y`�gA,�X�WE}q�"�\<��G%�M�Ϙ�yR��ȷ�8
���#�
�I�?��7�8���x��6��ǧ��ž�Lt�Y�/�QU̖/����87k��z.��A���h,�xwX+2V��p�GF�BFt��8��x�8�jM�3��n�M;JYd-T���oE���C}���i{�֗�{B���Ή|�~�����F��������BW��i�j4v5�"v5	:n���R�]�F��ܴ�Dk>ɫMF���ɸc�7�.|�ܭ��$��K�U�[94�e�8���O-[#�r�� ���oW�E!0��s}<��.K�j�&��ǚ�g#p̻L�D9_�շqz���*��pw�k�8��I�`�� ]�,�o9�PRO�	}Ÿ������m���),�(V����+&TǌX���TF��wE��v=�yWl�v��d�� ��m�#��z�Yt .5�N�*�=��� \�����E��YB �J ���!*��,[D�x������$���L��v�-��������zFa67Ff^����A���<6�[7�l}�o �k��}-�����J����y��HѡD8�V>Aߕ�Q����8���O(��?`V\@�1�Њ���4���`.�(�Q���eiA!*~/1[�> �y���(�c�X6C]I��j�hn�W�b|.�?�F��Z���a�L��>�G��
?("�x�KZ*8��ӗ۫�`�#)A�bi~?�w�r�h������#�T�Dv��(��Fp$�0(St���\i6,���=	d6{��xQ���u�oA;:���Ȝ�-�bP@�2^g�}��*�N�b���ʤ��?%ٺ��-~.�G	@���$j/�$��'Dx47�l,��\�_zq���QS�.�G�+�-(�=
4����>�����'�ƃ-X�Ƃ8*bee���5.V�h��b�hX�9HV��cA�C��`�����z6�\�Ȳyz���J��@��V�Toe{azP�XL���P��r�lk?xƠ�+l��KB
�K2�O�ź���Ț�MQ���=��G�k
:�K^��r�s��=�$G�i�:U�Ѩ%���V֘�,�哚5}<�,�J2I�Z��6��X����kc�IzO���w�p����6(�̛��P�[7����\�Fλ��a�����:58R53��8�+:���T�]7||��Z�I��;�9���ݠ�t�/�c����j�*hO���Xr�?�aI��' -kV�6��b����D�~H
�w,�F*f�F�O$�~���v�$3�]>��'��xz�q���'�>��M�P�x"Iۨ;��`�V�ɕ��[Y��V�.BKҿ�2�8&&��c�y9�n�O�GQG�,1TnQ>g����Ė e�����v�FVP���
��������7*��2����4�\}y��L��$�^E":���T�^��I��ru�b�`�;��d
���{c�	��݆�4�Pʴ�C!P|����++]�*3�r��;� �EuJm�����+Y��>5ys�GwB��S�4-y��#�],�c�F�
���Z�+�Vh5���}������������X�1���4��-�����b�i�'	(�fU[����G    � ��ۧX�����,�*p����1ΉUE GK[��4ď:��M��W��Gg��^�����W �A�
"�Ԗ���PW	���N�y�mg�@Xp�Cz��[Z��5��538�~�A�3my�+���ƞ���P�`��q�nh�A׻�آ����6����n�-��k�#�� F�]��`��� �B���'��*kAX/6��XZ��0��(RhH	���;����)�Uذ���{���%���#�Ͱ�C�d�T�7e����_���SHG�����H����;YQ�����v͑��la���8'D®Ĺ�`֧���Y���/ �M�J���>�l��=�m��
ӿ�V�1��혩�������D����##Tr}�B�p��O���R��##t���'�޽:��?�R�`4�B�8x���L�(��t}�p��x�l�ꁅu5νY�	��}�J���R��"7����A��W�	�Ο�/M�{��>�6%k\�~7d<��O�����Z�����bj��ˮQ�ʉ��ý�LTG
�_�-& ���J,� R��;�����g�A��)!H�e9���
]�G�ݶ��=M�NRS
\I��q��I��޳��6��C F��M@(ﳆ��-Jb ��EbX�'����0�bK"a� D��Z�S'��T�\z˂=�w��K�xpN�!���XeJ�+�I��6��N{�o�xe����W�˴Vr�T��h�� �{?�yӒ����n�e�x��8�z�	��jX�n�M@}�k> �O�|�M ��=�	P��h�Af�F��(� n|����b� ���hX��(��Hl��ʺ�ӇO���O�ʆ#�"O�ǥK��=���	`�CbiGڊ¡h@�sY���˺hx�m��<c�PU�l�֔��̀�� ��|ќMq�.���C��Y�4�H���+�,g�w��u&���Rlw�%C�F (0K7u�M>���Y'��i&(�ǎ0ɇ)��,�6�q�<�!�j�d���'�L $�W��za�B-1�k����sO`"G��J]�|(�����������/촐�j��P.F�2��-�;S|h�͑�������p ��s l���&�J�[��	{��+72@��$�'N����&]2&A7Z��%��vN@F���	C���c�uָ�pm h�(γJs�oo�P�D})ҕ:�q�4�l��2'@���̝O]��ͬl-�|fd$ܡ�hpƍ̰��V��*�9��~�o�tѵ)���r/c�!Fv��)��+���8?�B�鵶���B�s�c���'c��S�L$ӆi{
�h	n�}:�N)���t8��^���d+Y�j@�3��,��-[<��:��nZ!P0��'�<�i0���7��>�{ݟ�8� �]��q]�����`�.�X{4<a�sĦ#/�E�Hc�ύ��J�uX���TP�o[���ͻ�Z^ko�*W�d]��1ϙE�Ŧ#���AYi�V+���MkI��y{�Xm���y&�tߔ���r�x�7�����NG�ci��l:�ʗ��^�e�W.O���c�U�"`�� ��4ߛ]����%OI]�]����ۮ��>V�n�´����*q �K�����o>>H���Z�w�ɬy�>KЦc)G����?'���q��1+�u;��Q�JԠ�6�ej�G�M7{5��K�-��=�LZb��x}�G�1u5$��H��������ښ�*�LW+��L�27麌׉e��m�5 p6�>"�����w���Q"��U[7� �(��ȶ���mL?����ƀ�n������L���_� #lK���r���ӒU8VXh��%GhO��TJ*�նڗ���ep:��e'NAI7�_l����Z@�^ԝ`��B����6��데��sT�/��Fa���A;��N��#��
N�9�\uy�Sp�MQ<��@P��n����M6-�'�q'��&x����f�䘝̹Q���+u��m�<|ѫ�ԘwV�d�OA?7�u�S���1�a![�����MvX����q�U�F��)8�jm����Q4�ю0�p�ѫbgcx�ʽ�
q��t��F���*H	Z�m�O#ɶo�Y�;S#��Ф<�"2Y���pű�+o-���ܗ��̇�d���С:ffL������s{���ܮ�|�)�s�Nm|�.v�ݾ��s�%~�s
����l

�
.NBi�涗m��2>����T��oԹ5�� a�({`SAYY#����U���� YZ�Z;�f���^RB�\����"�ܬ�Ը> h�hf���g���\�<y�>1��-�l~@�Ic}��
&hFb�}�0�-�
|��F�@)j��2��?�f��q�$yb��;i�ܢI����y	��,�,t[��Ɯ�
� >���s<F%�hԫ�M��綒ך�N���ϭ��}.*���SD�/��;~�[���I����"L�4ʞGo �� �'�Km��x��/�� ��jk�b3c�0�R[<ڞ���ԃ,��<�[��>#}W,m\��X�*��������|�m��=~���9==����4�^	�P��0����)-���H~oOO�� �}t`���F~W��S����$ ���$����.S��W�@%�q"F��_�f���s�i���X9Y_�`2y�7TdA۴(�de�~ػܒ �.���Ms�R����������ӝ�.�����=���6a;7T w,��ď�:u�\����7p�RQ%'1��.��c�������+\���ހw�So&���Ah�U��q��-�r���ۯ]�=׷xF�ma��R�ﶵD!���ܣ��cj�PH�a(�J��(Tl2��ĝ%m`� b�� ��l]�4�;��5I���K��w���3�N�����:>�I�i���9YJufU������v�X�����,�T�KA-�r��F��-�X1"J!�x�aN�K����X��=N�h'!�ڞ����Y�ۈ�E���]۽�����x3P�	�����g�N�C��q���@��=�%�Cċ
�->���k�4K���6���&o�/�����s���B���Z�
Rw������T�Nያ���	�����Č�������g��#;ey��К+p���F��n�,�z���o�����_{¹k�&����.9vX�Ά�!����<�y��:��d �!lt&��93q�c�1ρ���9B��}����Wr�Jͱjf�aΟ�2%o,���:��_2e�w.:!C`�}\>���C	�@w�0FVt�׆s+h:�,��#�n/�ܿ{{u�R�#��ࣝ.�9;�<��WQ��3�2qU�0�]��c��a,��S���[ڄ��P�V� ��48O�׬W�*��M?	�)�.Id�F���O��(���T�Y*�$Y�V��69��!!T�V�ӵK�?P>����v�1Ӎ�W/"YZ�#�-�K;Ovc
�0�v6鸅�e�S<��'��U��,���c~�/r�0��� ���t�?D���$�(�@+��[���^��|/�Po���BO��J��o]�M\���x{O��4�N��kUCؖ	�d������=�<�� ��UtN�7��M�1
�%'�!(�iS�U�*��-�^����r��7�\�[�+���ڃH���a@��6����.���G-�ޘ��z� ��V��{w�:�����:��kK��b�	EK�g��?�+O��ʤ焇@������r�͜9�S�w�"�8N7&�/���yf�h)��%Y�};F�/���@ڤjaTWuG��<��|Lڣ!�����Ч�Z�n� H>&���ݟvs�b?���&�I>Z��D���}�Qޠ�)4bE�WfT�sD!��Y>���{���B���a���.iwuB �?a�`����)h_(��4��u��p���e	!h��͢���w>
c�W����G`p���.    e�mB*��t�ɨ4���}BD9�m�������R�B���"��`�e�ׇ���߾��R�����J�l$Φ�A)V�S@��`uH�� [,�X0l��"8�cQ���]��٨�F>E;T�:*ۙKJ�a���J?9�i���Yx���|v��M�U�l����w@�I��vw�*���O����ǁ9�\�.&�g���	�'�N�[o���0+�L�����,���y�1������8�mP�₎���J:���j߀U"��c�ZG��O��h9Z�ܨ�K���3I��p�Ӌ�!`^� Wm�B^�9�y��d("�ͧӘi�y�k�s��с\vD@�4�;-Xl��"P�_�=�ۀ�F@��.�;�Q�h4zhOw�:�AC�3�ɘ0t��.�X3�zgS!��J��d��ށ�����Z��pҕ���`kzH�~!�Gں<�(7��cd��8��z\����1�襍�D" ��&�fRzHJ��e %.�r(rڥ�E��b�?0�ex�a�,��`�qp��mL�ё����&yG�����������jh/o�l���+՚�k���L�S�pr46�~>����}b{Nz�Ɖ�L7�{ L��C�4a��N`9Bn�d�J�0E<^6�o��H�`|��X�Jm3�"��,�ǖ��n<\=�m��2ʺ�w�zH�A#��=��������'#1P�Z'���!T�weş}��p�`'� ����# j+-c�D��[x-���l��=��Z�����)�T��$�m�*�]�v� ���"��#T��}X������Ϯ�`z�tk���]\�wF�w����j�{n�u1��$��m=�(���Y��`�F��<�����V���YLp��]:�p�Φ�g�Q��5;|�hmk����ǥ�=� �apH�^U_l�mLM%�+�Cǣ1�|ʁ+�����я'�<�9�����pl5[G�wi�����m�©1t�
|�]� gΌ�Α�axK�a���q���jj�s�����=���k�;ٗ���E�����JPv.�����⸀��l;��a�ׁHL�}�[�d;��l`[CZ�Ta�
]T���D #��cº(DqSz\��Q�k�<T;3�����O���$gX���hs�$�SU�V�"��21i�F�ypdt�I4�Tg�LU�,��/Y���"Ӄ��lx����@����c��vp�ms����NHg�1===t�j�Mas���ϛms�ӑ|�;4I=
s��%h^�<�7��4J����x�����
怤���h��@��]��_�40)}�Y��/| l�9��쨽9����U$�F-�w�4�)ɷ��ς<���9D8��������K�� �ω������v�-�����V!`����D
�=���Gsի3�,����|44�D0�Ͳ^���;��?�S�<�Ȼ6�3��s6Q]v�-�w����7E9$��4�Ё�s���>��i�Խ�M}�N�B�����AV�u>��+������^�d�9��rv¥���s ��b�덉�LψA�����R��|�Q�3�[T+�7��-u����ھ�ܴP����o?/�2��ϟ�<.�s��b�GH����NW�%Q���ʴ;�q�l/&�w&���*�2����qNZ�d��2Ҭ��Y��H�US�0AFd60~��y�-.�څY�������9��X�)��C@�"��7w�2-�ґX�D�VEX�q���t�˹��b��&	h�w�.__@ғ�9T�����G�do�������9pj�:k{̒�,e|k,�l����^�.ܴx-�vD�gDߦ�d��� ��ӢG�06�FtPZl�������S�6��Dw��L��y���V�9��c��2 -t���<�A��Ēc$%v��P�,@�E?�6���|ӕ�jv�B0������<��΁8��n�A��0���9 焥����г���+��$�i�1Noh'�f:���&�s�)@�E��r�>W^�����͝�X��g��A,��n��@$�Ne>š���/����!�9Xe�q{�7U�(�]a�?��X�3�r�x��5;,1�l4Y�Ei�,��m��y{e��^�4�U�,�"��~��lV�S=�uKe����H�̊���}QX:�6I5��0�,N�x����촣�s���o}�ܭ0�C�#Pp�Y��ڛ�����^gs����(��谌����y�#1K;�ee�Ӂ��N�֞����kStA�6q��k�Wu<w�Z_�T{Y���;] ��z@���ru��%֕��Cy����!"��Ӡ��� ���;�h�..KET�1gUǪzr� ĉ������	㫌{{֣���B;��JZ��r�����j�;�%�X�FÖh%��5Ϋ�ߊ��H����#ɋ���Ux*K(�?]e�ᥖ2�!2�l(Y^���B�v�e#�f���l8
;�Ky�$��=ˋ���I)�ܘ'Q�.�)�%]��|�_�7KDK��Y5u�v�X�C�y�H��}dC�\;S8���p�,�z�ĵf��A|iEH�U`Pi���=빌�۫�UDh;�g�]�`�
�4���u�$�����j�Q�t���M˾�z���_�q��p^��|P���UA5�Cũ��A��P[�zmS�U���ٮ�[΀9Է����U;+����M�1Pe���|��<�O	���қЇ|ng�^u�Aڋ�t��*V��y����QJSJ�����{7�<��< �Uf��	���hǣD�#Og��ֲ��498ԝ�ԚSK'M��A�*�,����y������+[�y"�f���k�����v>J�/�{{GCz�����Jz؍u�|���>���װfw3<􈣣��b�W���!��qkGO���X����w[�E��ؼ}��hk�K�� A��P�SF�F"i3��u�6��e}CPѣ�E��4�l ���[= 	��B[h�Ɋt��5 T{a,D��P<��ି7Iw�9���x)]Z�ҀA�E�^)�y�U���dk��y^'ȑ.�T�Q�Mr�ܭb�
��\��|�əg��U�E ��.�O�#r��ވ~��g�n4�;9�sɢ����1�!��)(�UNa�#��鄸�@E[�;�.�����)�P�� ����u�e���}t�V�w������������=���ꝗD)���������y�ʹ���^��<�*6	ts���.W>o�ޔ_��a���*Q{���Ï��@w���}*P����tI����b����V߿��Q�BX�d�"�xi�#�y�f]������p�D�ʶ|���G�~�i���_uw{���0�k�F�h���3��.#6��8Q;	�#t)�H���o�@p��ڻ$u���N)��vW�9�G{�D�@�������X�7]A���Ja����������ZO3�]]6�G�1=8���}<��ˊ�ku�QO�k�-�-�������KI87�`����ٲ��x3n�1�V����w��2��9����e�����?^�i�ח�y�k���2�c�/�]�-�#�J�\,�(�M�-�E]Gl:�z��ʮ	�/����&�@�wD]�b#hm�O{N<��Î����l�:��D]z���/�] �u�����"$�)T���������Y��?�.�?��þ��R������bt�� j{P�{��t��~/XQ�[�t9�^��(���ք�´�u�{�R_�����(�
!ߋc����K�U��}bwY6�X�a}��v7����K��ŮVs��ko�@W_��jpnY�vj�~&:�}��*>֥̈́�Ch@����T��]}e����f����:������Y;�v[����K��Q���������r�p��״Z�bo[�;X�-����n_��5�gsM_��h�O7Uo����
H	��v�z��?.J������N������W��o�9��������    ���      #   �   x�M��N�@���S��:�~l"Tq��R��řqi�d͢��'�i��_,���҉Xe�K9p�J�����K�岑�8��j�3�N��x��6������d��~4K8�(J�VECWP����Z����*��~�c�VG'g���"��c�컜r{��
�2�N�8���&�xFz�����^r��-`K1��(�V���G��J���]��Mv���װO"�PL���ٙj�|D�_�1i�      %   �  x��T[n�0�O�h��%y�� @Q Fя�A���K�vK��З��j�4�D>};�?��ǉ�iF�Iv������J��@�Mj��ԓNub�~�����������D������K����z��QL]�+���T�J,��'ľ)>7�܅�T�ʅ�_�����)��;j��v[|"V4d�@�;j]<����x��B�Ak�Za��#:2��`[C��̅���)���z��"^X>���5�D�B�{������ǉ���
�DY�<�m'��䎑���g�)s���NE'�l�h� [晳t��U�.�i����E���µ���S�:f�������Lu��$�vQx�A�۷�uGѓ�q��$��q�,WV�������:FkvF������9�5���->[�Lzn ˖�<o��2��ts����Eh[C\��"�,uX�=���M"�0��(��ƎRw      '   �  x���ͪ�0���S��$˒���rI(�.
ٌ��Xv���}�Jqn��R�s�3gdZ��q��\v����hʁ��k47�X�tZS+<�}w��HN9����hк�c|��S�ޑox���Z�=�{��v���,'��i��_�cp�9!��xu�r�G��֌
�e��qW�K����tq��=܇k��2��M����4���j&��5���J�uU�d�cґ�y���cM)�J).�"}7k��o܌������Z�LŨfFy	��p���ϧ4��Q�]֮���3u��x��� ��^{keʵ��
�1va�;��������@�������Q@k��t�B�wt�v �g����l����<g&���`;$�C�5��P�/�a�      (   �   x�M�� г�T>�l�u,��ɼ�D��:��!Fj�U�(i�D��މq�y0�հ¾w::�Sз.a)8��	c�0��.`��pp�B7��$1᝸� 8����P4� �ۀ{]�5�M�q�9[9)nI)-�~eyE      *     x�퓽N�0�g�SXs�i�3�X�ڍ-�8򇪼=v��	[%���ӯ"UMj�dh��)*�Tp��{�}�g��[*ho���P�s�;��
�~��%�#za���\!��Z28�k���l�r�ez���.Cy��M��S'�?A4�*8�|r��cr.�\D�0��j�Mq�w�y=q=��'p�\p����HA�S�c�CGClTy����b�N�L�������۹�0EPm�a��1�b]'?A/% ����u      ,   �   x�M�[!��a�u^w���ѬvK,!���z�h6A+�@o��(Ȩ�4�#�?tp�:�>@�u�`��̴͵-��kR��R��-=�E�/I���&.��r���|h�TP�2�(����"����¾��"���� ?��>�      .      x��[ے�F�}n~�I/��	��]i',+V�u8b_�$�	7Ip PT����*�`��j7�3�C��RU'3Of������\�k�aYwu��-��+���n
!����t\&���L�+��]�Z�ŏ�|h������bh�u]�C�+sz$+��Fi�y��v��M��	=y_l�z%�f�l��(WZ���}���6�d��m;��+�͢طݢ/�ǜ6�Kɽ�
�~Zo�a�0�9��kƯ�-�U�xrFr8���(��Wۃ�|#y��5紗�Y"2��5_j�)�v]G{mKN\�RX�ODy�_���x_�a�q�E�������uu�Z=�����Vuؠ�pX���~����m���-*l��y~7�6�l^��͗Eյ;���/�]_�P@3�E�����=���H�O��M�(��f֬�]����j6ev����Y�i���/u�3)�b�պش�~�
��[u����p����=m߿e�ߗ��8���v&uPJ;?,�����w��r8W �y�L< ෺Ϭc���V�[��K3i�P{_a���c�EW��s�T�"�u}h頗@tSc��Ͱ�8������bs�����LVu�g�C]u9�aG���̅m�������f����3�������
�V��bq�>�[�X���;|����4�������>�S1�� ��UbK�Ē�EE�d��Ь��v�~�_͂P~8�@BR_�Aph�CI��K�>�!�?�����L��gs�|)��.��R#� �%��J���"�e�/'$D���ы�����}��c������A\������̔=�Rp{�?�IK�֤#sغT�W�����#.��z�M0'�X)�e,d��f6b`Q��6�1���kN�%|v2GG��������u�o�ߠ�,P�WH��}��_�n��a5��盂R�Cʇ��J�*{Z��H�Gk��w.�+�H�q�����ž������ȩ�QN�@�%Y�K�!����2mGgbTT���V��d"&L�.�����95��Gο� wʋ��̰�Tj�QҊ�I8��!!��(����\\�I�.��Ə�`NR�<K)��vi?�X�bPt��nUu�������!qL�>r�`�h7���ծF-�U��(Q4���f�
%�<��U
�4��Gзw_gF?3�B,�)�d2��; C�y��_M��������ֆ��Hi�L)
,Wŗz�Q܉�`�";9?>R��͙v:�A�1�S�\������)�8���	�����3����Ѫm�IS�k���͹���>�Ōa��t+0��j��ͻ`<�7 n<:�_���6���� Y����EZy��7�0D/ڜZ�*��A?�)n~Ax]�����	��6�J,90�p�q�C?���~��6�V�,1Z��)*/�T�ʔ<��N�Po����H��Ng��Y�c������I���<�b�͉�^poe\���Y�hjQR-ͣxp1V����*�qDE�G�ƒ�ޡ���f�-�{�a	�׺�7h]CC�i�uh��ԞR�����f��D]�0��Uݣ�����|@���K�,�+�:Xx|$�]Y�m>$Ɵҗ3'����B�O���E���-��s���\�1O�N�"Q�E+�|}fݙʋ�k�S'Cu�ّ:�}5����9��}L��j����[����O�6��+-wRǲ�_L�&*i�4f��>�D�u誢�V(¿R,��n�-��p�m�ۃ���*�e�]zU�H8$]���!y�Fv�8z8�0I[���-g"��f�Ť�����J�気��@GN�)[�^��I��)hH3+�[,��K���_2o¤�NاPj�6��*j�J�SwXJ�_��N���94��d���1�/8YX_ܵ�"��(1�T+]*���g�ŀ��F�����̻���nX�m�m:�l��dكф*z�[e��̋��/��W�j�/P���B��8˻�:q�C������닛��N�KTˑN@��c�MUj��EN^�R�%
��Sbj??�պY���d0�6��M=�hL���V���m �~�v���h�6g�P�^iENP.�ص،5��p/��PqiA߯i���bi��i)#���	p(��谜��Po�򐞷s�55��3�hq�d�=���Dz0s����E��tZB�gퟻ;�i�bZ&�!P��Rifi0s��?�(=J8�J��	��X�yt��������F%�p�B$+�q��>��ِ�	�!�C���dE�	�� ����ع���͐?k��)��&�phS�j�ڗ�y�]d7j�P"��H_ѳ�};o*jcnc�<W��2���Kq�$�~�.AI��~h�����u�R�(�.�ۏ���kNץ�x2+�2K�*ܶ��E�����h��|���NgE����(ti���=��ώv�D�@*j69E���N&�a��Qʦ��j��==�n���@�~ėPx��C��v3���& �Ѥx܇q2��}(Z;�]<���k�vs�t���� ���N
=�KFp��� �ŷ�߫E�w���8@��b8$\�@x��'􄼜$ʲՖrA4|a��:M��L����Ǧ�۴�����:��M�4�J//d�Q'(��Ns�IO�0��9Q 
=HUrgD&<��]sOW�K� �X�@h`���Ű'�c���{J��v^� ��>t����l(��t����I �{s¡3�rr�uHn����%TGw!F�v������ۚn��6c�9VV	һ5?O�� ��9����Yk���j҆bI���w����U}���؛䔢�SB�x`�N�O�ei�����D]�Q.�cT�ۺ���m_�2mRPG����V�mA�լJé��������J�L��e@Z)��P=��1qԉV�Fq�N�	u��SKC�:&IGSS�B��R93nL8���~8��EǾ]��8%���!���><� �N�p�aX�y}�ԋ�y�^�S������Z�sI�:�+,_G��F�<)V:%�R�G��x�������{����7�ƺ��g�ҥk��Ĺ+�L`}�Z�k�rd+���c�Hw���O�s�t�W�eՁ*����������'j�+����	-a���hڈ��j�ޠ�@��ɧ��1�ǡ�s�P��w��&Cs����H�LEOhN�(%���,���ݳgXm���hj$���O ���ݹ?$��:p^ΐ�Ǫ~��ջ��4�Y��9iAW�۴�_�Nu"/�q���xs��#	}�(P��W`��^\���J���N�~�F=-F���&j4/��L�o���7��V���<��{����h8o�7�<�QFbO����66(����#G�M��� e���]ݤz0�Pyuժo����+��+�Cxaӷ]�ϻfK���aP�!������7�]s�X�v��:�Ka�ga�������JJ�l>�/FX���:�%����c���n�?�RG��Z�$�N��E����(%ܸ�]�Ko[��-����&4��C� Th2y`8O6dq�ѐiMpף��4���[��'Yw�[0d��r}��d���n5�M}���ѻ4�:�r��R`�9�E�wAR�w�o����3��P�Ŷ�R�v�`�^��T'j�p�Ȟ�^��Żf�9�������@Ւ:~���yY�)dw�dm��1S�G�t�l"���4�qIֽ|�G���Bѫ�K�i5Uf�a�ͅ��-�n/�AQw��(S���V��V�\i]خI%w�.�姧�Pɨ����O=}#$)	;ʤ)�@�(B�d�8��n���Dd	s��8�׋�vh��a��O�	a^]��I)1`�9��>a��$g(�
��#\�EpI:]	�X�F��Dw��<>N�ŉ�S�ݸ,r�N����>���C,�#������(�����J{jM��`l�G�c��$�T0�闿�[1�$�J�r�tl �J$K)Y�Z��M�ފ�hi�D�+���\}m���tY�h�p,�{�*\0t'=�T�n{8�*� t  ��t�<��56��KO�
�` F�Z�iG4Q@ϱ�)4�����=
�md��}��E]ܮ�̢�p	�|L��l�z���k�'��I����w��Aw�K�T��!�sp�s���������_�g�:<�1�*���e��9I)gO�"x�� �s�<SMHN�o������'!��w.P ���ؐ�2�%;��vl�x#��;:O[�������:�]��N���2��j����	�r����v�t+-y��Г�u�me�� L3NÔ$�ӿ��}2� ���}�5�<�?�S�"be�e�%�ó�!����"��^�1�Ԧ�?��j�j'�|�K�UvJ7���U���K�iO��Tؔ�
DF>���O9�����d�     