package model;

import javax.persistence.EntityManager;

import common.PersistenceManager;
import dao.CurriculumDao;

public class InsertCurriculum {
	public static void main(String[] args) {

		// Insert Test
		System.out.println("This is test for insert.");
		CurriculumDao dao = new CurriculumDao();
		dao.setCl_crseno(3201).setCuri_area("Major").setCuri_groupnum(1231).setDeg_level("Undergraduate")
				.setDeg_major("Computer Science");
		EntityManager em = PersistenceManager.INSTANCE.getEntityManager();
		em.getTransaction().begin();
		em.persist(dao);
		em.getTransaction().commit();
		em.close();
		PersistenceManager.INSTANCE.close();
	}
}