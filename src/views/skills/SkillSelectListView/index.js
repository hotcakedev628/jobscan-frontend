import React from 'react';
import { Box } from '@mui/material';
import SkillSelect from 'src/components/SkillSelect';
import Actions from './Actions';

const SkillSelectListView = ({
	isAddDisabled,
	isLoading,
	skills,
	selectedSkills,
	onAdd,
	onChange,
	onRemove,
	onSearch
}) => {
	return (
		<Box>
			{selectedSkills.map((skill, idx) => (
				<SkillSelect
					key={idx}
					idx={idx}
					skills={skills}
					selectedSkill={skill.name}
					onChange={onChange}
					onRemove={onRemove}
					value={skill.rate}
				/>
			))}
			<Actions
				isLoading={isLoading}
				isAddDisabled={isAddDisabled}
				onAdd={onAdd}
				onSearch={onSearch}
			/>
		</Box>
	);
};

export default SkillSelectListView;
