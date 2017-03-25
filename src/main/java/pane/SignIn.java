package pane;

import java.awt.CardLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JPanel;

import common.GSWPanel;

public class SignIn extends JPanel implements ActionListener, GSWPanel {

	CardLayout cl;
	JPanel contentPane;

	public SignIn() {
	}

	public SignIn(CardLayout cl, JPanel contentPane) {
		this.contentPane = contentPane;
		this.cl = cl;

		JButton signin = new JButton("Sign In");
		JButton forgetAccount = new JButton("Forget Account");
		JButton signup = new JButton("Sign Up");

		signin.addActionListener(this);
		signup.addActionListener(this);
		forgetAccount.addActionListener(this);

		setOpaque(false);
		add(signin);
		add(signup);
		add(forgetAccount);
	}

	@Override
	public JPanel getPanel() {
		return this;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (e.getActionCommand().equals("Sign Up")) {
			cl.show(contentPane, "signup");
		}
		if (e.getActionCommand().equals("Sign In")) {
			cl.show(contentPane, "main");
		}
		if (e.getActionCommand().equals("Forget Account")) {
			cl.show(contentPane, "forgetAccount");
		}

	}

}
