package dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "curriculum")
public class CurriculumDto {
	@Id
	private Integer cl_crseno;

	private String deg_level;
	private String curi_area;
	private String deg_major;
	private String cl_title;
	private String cl_SubjCode;
	private Integer curi_groupnum;

	public String getCl_SubjCode() {
		return cl_SubjCode;
	}

	public void setCl_SubjCode(String cl_SubjCode) {
		this.cl_SubjCode = cl_SubjCode;
	}

	public String getCl_title() {
		return cl_title;
	}

	public CurriculumDto setCl_title(String cl_title) {
		this.cl_title = cl_title;
		return this;
	}

	public Integer getCl_crseno() {
		return cl_crseno;
	}

	public CurriculumDto setCl_crseno(Integer cl_crseno) {
		this.cl_crseno = cl_crseno;
		return this;
	}

	public String getDeg_level() {
		return deg_level;
	}

	public CurriculumDto setDeg_level(String deg_level) {
		this.deg_level = deg_level;
		return this;
	}

	public String getCuri_area() {
		return curi_area;
	}

	public CurriculumDto setCuri_area(String curi_area) {
		this.curi_area = curi_area;
		return this;
	}

	public String getDeg_major() {
		return deg_major;
	}

	public CurriculumDto setDeg_major(String deg_major) {
		this.deg_major = deg_major;
		return this;
	}

	public Integer getCuri_groupnum() {
		return curi_groupnum;
	}

	public CurriculumDto setCuri_groupnum(Integer curi_groupnum) {
		this.curi_groupnum = curi_groupnum;
		return this;
	}

}
