package pane;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JList;
import javax.swing.JPanel;

import common.GSWPanel;

public class Left_Curriculum extends JPanel implements ActionListener, GSWPanel {

	public Left_Curriculum() {
		String[] dummy = new String[100];
		dummy[0] = "Curriculum Section";
		for (int i = 1; i < 100; i++) {
			dummy[i] = i + ". This is dummy database";
		}
		add(new JList(dummy));
	}

	@Override
	public JPanel getPanel() {

		return this;
	}

	@Override
	public void actionPerformed(ActionEvent e) {

	}
}
