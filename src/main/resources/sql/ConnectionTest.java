package sql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

//MYSql JDBC Driver is located in /resource
public class ConnectionTest {

	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";

	// from remote
	 static final String DB_URL =
	 "jdbc:mysql://dbms.gswcm.net:3306/Group 2";

	static final String USERNAME = "hhong";
	static final String PASSWORD = "219590";
	
	
	public static void main(String[] args) {
		Connection conn = null;
		Statement stmt = null;
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);
			System.out.println("\n- MySQL Connection");
			stmt = conn.createStatement();

			String sql;
			sql = "SELECT * FROM CLASS";
			ResultSet rs = stmt.executeQuery(sql);
			System.out.println("DB_URL: " + DB_URL);
			System.out.println("USERNAME: " + USERNAME);
			System.out.println("Test for query: " + sql.toString());

			while (rs.next()) {
				String[] temp = new String[2];
				System.out.println("-------------");
				temp[0] = rs.getString("cl_crseno");
				temp[1] = rs.getString("cl_subject");

				for (String item : temp) {
					System.out.println(item);
				}
			}
			rs.close();
			stmt.close();
			conn.close();
		} catch (SQLException se1) {
			se1.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				if (stmt != null)
					stmt.close();
			} catch (SQLException se2) {
			}
			try {
				if (conn != null)
					conn.close();
			} catch (SQLException se) {
				se.printStackTrace();
			}
		}
		System.out.println("\n\n- MySQL Connection Close");
	}
}