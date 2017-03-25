package pane;

import java.awt.CardLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

import common.GSWPanel;

public class SignUp extends JPanel implements ActionListener, GSWPanel {

	CardLayout cl;
	JPanel contentPane;

	public SignUp(CardLayout cl, JPanel contentPane) {
		this.contentPane = contentPane;
		this.cl = cl;

		JButton back = new JButton("Back");

		add(new JLabel("Sign up"));
		add(back);

		back.addActionListener(this);

		setOpaque(false);
	}

	@Override
	public JPanel getPanel() {
		return this;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (e.getActionCommand().equals("Back")) {
			cl.show(contentPane, "signin");
		}
	}

}
