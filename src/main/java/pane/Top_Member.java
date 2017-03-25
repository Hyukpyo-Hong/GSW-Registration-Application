package pane;

import java.awt.CardLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;

import common.GSWPanel;

public class Top_Member extends JPanel implements ActionListener, GSWPanel {

	CardLayout cl;
	JPanel contentPane;

	public Top_Member(CardLayout cl, JPanel contentPane) {
		this.contentPane = contentPane;
		this.cl = cl;

		JButton logout = new JButton("Log Out");

		add(new JLabel("Member Section"));
		add(logout);

		logout.addActionListener(this);

		setOpaque(false);
	}

	@Override
	public JPanel getPanel() {

		return this;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if (e.getActionCommand().equals("Log Out")) {
			cl.show(contentPane, "signin");
		}
	}

}
