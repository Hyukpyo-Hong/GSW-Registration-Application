package pane;

import java.awt.CardLayout;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Image;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.UIManager;

public class Frame extends JFrame {

	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {

			public void run() {
				try {
					UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
					Frame frame = new Frame();
					frame.setLocationRelativeTo(null);
					frame.setVisible(true);
				} catch (Exception e) {
					System.err.println(e.getMessage());
					System.exit(1);
				}
			}
		});

	}

	public Frame() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setSize(1300, 900);
		setResizable(false);
		setTitle("GSW Registration");

		JPanel contentPane = new BackgroundPane();
		setContentPane(contentPane);

		CardLayout cl = new CardLayout();
		contentPane.setLayout(cl);

		SignIn signin = new SignIn(cl, contentPane);
		SignUp signup = new SignUp(cl, contentPane);
		ForgetAccount forgetAccount = new ForgetAccount(cl, contentPane);
		Main main = new Main(cl, contentPane);

		contentPane.add(signin.getPanel(), "signin");
		contentPane.add(signup.getPanel(), "signup");
		contentPane.add(main.getPanel(), "main");
		contentPane.add(forgetAccount.getPanel(), "forgetAccount");
	}

	public class BackgroundPane extends JPanel {

		Image bg = new ImageIcon(getClass().getResource("/background.jpg")).getImage();

		@Override
		public void paintComponent(Graphics g) {
			g.drawImage(bg, 0, 0, this);
		}
	}

}
