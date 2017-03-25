package pane;

import java.awt.CardLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Graphics;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Box;
import javax.swing.ImageIcon;
import javax.swing.JPanel;
import javax.swing.JScrollPane;

import common.GSWPanel;

public class Main extends JPanel implements ActionListener, GSWPanel {

	CardLayout cl;
	JPanel contentPane;

	public Main(CardLayout cl, JPanel contentPane) {
		this.contentPane = contentPane;
		this.cl = cl;

		JPanel background = new BackgroundPane();

		// Top
		Top_Member top_member = new Top_Member(cl, contentPane);

		// Center
		Box box = Box.createHorizontalBox();
		Left_Curriculum left_curriculum = new Left_Curriculum();
		Right_Schedule right_schedule = new Right_Schedule();
		box.add(new JScrollPane(left_curriculum.getPanel()));
		box.add(new JScrollPane(right_schedule.getPanel()));

		// Bottom
		Bottom_Description bottom_description = new Bottom_Description();

		// Remove top margin of panel
		((FlowLayout) this.getLayout()).setVgap(0);

		background.setLayout(new GridBagLayout());
		background.setOpaque(true);
		background.setPreferredSize(new Dimension(1300, 900));

		GridBagConstraints c = new GridBagConstraints();

		c.fill = GridBagConstraints.HORIZONTAL;
		c.ipady = 135;
		c.weightx = 0;
		c.gridx = 0;
		c.gridy = 0;
		background.add(top_member.getPanel(), c);

		c.fill = GridBagConstraints.HORIZONTAL;
		c.ipady = 600;
		c.weightx = 0.5;
		c.gridx = 0;
		c.gridy = 1;
		background.add(box, c);

		c.fill = GridBagConstraints.HORIZONTAL;
		c.ipady = 165;
		c.weightx = 0;
		c.gridx = 0;
		c.gridy = 2;
		background.add(new JScrollPane(bottom_description.getPanel()), c);

		add(background);
		setOpaque(false);

	}

	public JPanel getPanel() {
		return this;
	}

	public void actionPerformed(ActionEvent e) {

	}

	public class BackgroundPane extends JPanel {

		Image bg = new ImageIcon(getClass().getResource("/toplogo.jpg")).getImage();

		@Override
		public void paintComponent(Graphics g) {
			g.drawImage(bg, 0, 0, this);
		}
	}

}
