CREATE TABLE description(
    cl_CrseNo smallint(6) not null,
    cl_SubjCode varchar(20) not null,
    des_contents varchar(500) not null,
    CONSTRAINT PK_description primary key (cl_CrseNo,cl_SubjCode)
);

