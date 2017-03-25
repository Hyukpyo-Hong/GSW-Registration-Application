package dao;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "curriculum")
public class CurriculumDao {
	@Id
	private Integer cl_crseno;

	private String deg_level;
	private String curi_area;
	private String deg_major;
	private Integer curi_groupnum;

	public Integer getCl_crseno() {
		return cl_crseno;
	}

	public CurriculumDao setCl_crseno(Integer cl_crseno) {
		this.cl_crseno = cl_crseno;
		return this;
	}

	public String getDeg_level() {
		return deg_level;
	}

	public CurriculumDao setDeg_level(String deg_level) {
		this.deg_level = deg_level;
		return this;
	}

	public String getCuri_area() {
		return curi_area;
	}

	public CurriculumDao setCuri_area(String curi_area) {
		this.curi_area = curi_area;
		return this;
	}

	public String getDeg_major() {
		return deg_major;
	}

	public CurriculumDao setDeg_major(String deg_major) {
		this.deg_major = deg_major;
		return this;
	}

	public Integer getCuri_groupnum() {
		return curi_groupnum;
	}

	public CurriculumDao setCuri_groupnum(Integer curi_groupnum) {
		this.curi_groupnum = curi_groupnum;
		return this;
	}

}
