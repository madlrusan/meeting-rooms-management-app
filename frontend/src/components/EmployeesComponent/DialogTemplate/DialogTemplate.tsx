import { useState } from "react";
import {
	ButtonsContainer,
	CancelButton,
	SubmitButton,
} from "./DialogTemplate.components";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { AddEmployee, UpdateEmployee } from "../../../api/employees";
export const DialogForm = (props: any) => {
	const [val, setVal] = useState(props);
	const navigate = useNavigate();
	const onAdd = useMutation(AddEmployee, {
		onSuccess: (data) => {
			console.log("successful added", data);
			navigate("/employees");
		},
	});
	const onEdit = useMutation(UpdateEmployee, {
		onSuccess: (data) => {
			console.log("successful updated", data);
			navigate("/employees");
		},
	});
	const handleSubmit = (event: any) => {
		console.log(event);
		if (val.isAdd) {
			onAdd.mutate(val);
		} else {
			onEdit.mutate(val);
		}
		event.preventDefault();
	};
	return (
		<div>
			<div className="form-row">
				<div className="form-group col-md-6">
					<div className="e-float-input e-control-wrapper">
						<input
							id="employeePIN"
							name="EmployeePIN"
							type="text"
							value={val.employeePIN}
							onChange={(event) =>
								setVal({ ...val, employeePIN: event.target.value })
							}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top"> Employee PIN</label>
					</div>
					<div className="e-float-input e-control-wrapper">
						<input
							id="employeeFirstName"
							name="EmployeeFirstName"
							type="text"
							value={val.employeeFirstName}
							onChange={(event) =>
								setVal({ ...val, employeeFirstName: event.target.value })
							}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top">
							Employee First Name
						</label>
					</div>
					<div className="e-float-input e-control-wrapper">
						<input
							id="employeeLastName"
							name="EmployeeLastName"
							type="text"
							value={val.employeeLastName}
							onChange={(event) =>
								setVal({ ...val, employeeLastName: event.target.value })
							}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top">
							Employee Last Name
						</label>
					</div>

					<div className="e-float-input e-control-wrapper">
						<input
							id="employeeDepartment"
							name="EmployeeDepartment"
							type="text"
							value={val.employeeDepartment}
							onChange={(event) =>
								setVal({ ...val, employeeDepartment: event.target.value })
							}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top">
							Employee Department
						</label>
					</div>
					<div className="e-float-input e-control-wrapper">
						<input
							id="employeePosition"
							name="EmployeePosition"
							type="text"
							value={val.employeePosition}
							onChange={(event) =>
								setVal({ ...val, employeePosition: event.target.value })
							}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top">
							Employee Position
						</label>
					</div>
					<div className="e-float-input e-control-wrapper">
						<input
							id="employeeEmail"
							name="EmployeeEmail"
							type="text"
							value={val.employeeEmail}
							onChange={(event) =>
								setVal({ ...val, employeeEmail: event.target.value })
							}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top">Employee Email</label>
					</div>
					{val.isAdd && (
						<div className="e-float-input e-control-wrapper">
							<input
								id="employeePassword"
								name="EmployeePassword"
								type="text"
								value={val.employeePassword}
								onChange={(event) =>
									setVal({ ...val, employeePassword: event.target.value })
								}
							/>
							<span className="e-float-line" />
							<label className="e-float-text e-label-top">
								Employee Password
							</label>
						</div>
					)}
				</div>
			</div>
			<ButtonsContainer>
				<CancelButton
					cssClass="e-primary"
					onClick={(event: any) => {
						console.log("Cancel");
						event.preventDefault();
					}}>
					Cancel
				</CancelButton>
				<SubmitButton
					cssClass="e-primary"
					onClick={(event: any) => handleSubmit(event)}>
					Save
				</SubmitButton>
			</ButtonsContainer>
		</div>
	);
};

export const HTemplate = (args: any) => {
	if (!args.isAdd) {
		return (
			<div>
				Edit {args.employeeFirstName} {args.employeeLastName}
			</div>
		);
	} else if (args.isAdd) {
		return <div>Add a new employee</div>;
	}
};

export const FTemplate = (args: any) => {
	return <div>{""}</div>;
};
