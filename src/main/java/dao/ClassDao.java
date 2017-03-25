package dao;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "class")
public class ClassDao {
	@Id
	private Integer cl_crseno;

	private String cl_subjcode;

	public Integer getCl_crseno() {
		return cl_crseno;
	}

	public ClassDao setCl_crseno(Integer cl_crseno) {
		this.cl_crseno = cl_crseno;
		return this;
	}

	public String getCl_subjcode() {
		return cl_subjcode;
	}

	public ClassDao setCl_subjcode(String cl_subjcode) {
		this.cl_subjcode = cl_subjcode;
		return this;
	}

}
