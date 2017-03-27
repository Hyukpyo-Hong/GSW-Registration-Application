package dao;

import java.util.List;
import java.util.Random;

import javax.persistence.EntityManager;

import common.PersistenceManager;
import dto.CurriculumDto;

public class CRUD_Test_Hibernate_JPA {
	public static void main(String[] args) {
		// CRUD Test with curriculum table
		PersistenceManager.INSTANCE.getEntityManager(); // Initialize
		CRUD_Test_Hibernate_JPA obj = new CRUD_Test_Hibernate_JPA();
		CurriculumDto dto = null;
		int random = new Random().nextInt(10000);
		System.out.println("Random Number is :" + random);

		// Insert(Create)
		System.out.println("\nInsert Test");
		dto = new CurriculumDto();
		dto.setCl_crseno(random).setCuri_area("Major").setCuri_groupnum(1231).setDeg_level("Undergraduate")
				.setDeg_major("Computer Science");
		obj.insert(dto);

		// Update
		System.out.println("\nUpdate Test");
		dto = new CurriculumDto();
		dto = obj.get(random);
		dto.setDeg_major("Modified");
		obj.update(dto);

		// Read
		System.out.println("\nSingle Read Test");
		dto = new CurriculumDto();
		dto = obj.get(random);
		System.out.println("----------------------");
		System.out.println("CrseNo: " + dto.getCl_crseno());
		System.out.println("Level: " + dto.getDeg_level());
		System.out.println("Major: " + dto.getDeg_major());
		System.out.println("Area: " + dto.getCuri_area());
		System.out.println("GroupNum: " + dto.getCuri_groupnum());
		System.out.println("----------------------");

		// Delete
		System.out.println("\nDelete Test");
		dto = new CurriculumDto();
		obj.delete(random);

		// Read All
		System.out.println("\nMultiple Read Test");
		List<CurriculumDto> list = obj.getAll();
		for (CurriculumDto a : list) {
			System.out.println("----------------------");
			System.out.println("CrseNo: " + a.getCl_crseno());
			System.out.println("Level: " + a.getDeg_level());
			System.out.println("Major: " + a.getDeg_major());
			System.out.println("Area: " + a.getCuri_area());
			System.out.println("GroupNum: " + a.getCuri_groupnum());
		}
		System.out.println("----------------------");

		PersistenceManager.INSTANCE.close();

	}

	public List<CurriculumDto> getAll() {
		EntityManager em = null;
		List<CurriculumDto> list = null;
		try {
			em = PersistenceManager.INSTANCE.getEntityManager();
			list = em.createQuery("from CurriculumDto").getResultList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	public CurriculumDto get(Integer CL_crseno) {
		CurriculumDto dto = new CurriculumDto();
		EntityManager em = null;

		try {
			em = PersistenceManager.INSTANCE.getEntityManager();
			dto = em.find(CurriculumDto.class, CL_crseno);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}

	public void insert(CurriculumDto dto) {
		EntityManager em = null;
		try {
			em = PersistenceManager.INSTANCE.getEntityManager();
			em.getTransaction().begin();
			em.persist(dto);
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void update(CurriculumDto dto) {

		EntityManager em = null;

		try {
			em = PersistenceManager.INSTANCE.getEntityManager();
			em.getTransaction().begin();
			em.merge(dto);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void delete(Integer CL_crseno) {

		EntityManager em = null;

		try {
			em = PersistenceManager.INSTANCE.getEntityManager();
			em.getTransaction().begin();
			CurriculumDto dto = em.find(CurriculumDto.class, CL_crseno);
			em.remove(dto);
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
