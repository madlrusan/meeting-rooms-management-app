import React, { useState } from "react";
import { IDialogModel } from "./DialogTemplate.types";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
export const DialogTemplate = (props: any) => {
	const [value, setValue] = useState<any>();
	const state = { ...props };
	const onChange = (args: any) => {
		setValue({
			[(args.target as HTMLInputElement).name]: args.target.value,
		});
	};
	const data: IDialogModel = state;
	return (
		<div>
			<div className="form-row">
				<div className="form-group col-md-6">
					<div className="e-float-input e-control-wrapper">
						<input
							id="employeePIN"
							name="EmployeePIN"
							type="text"
							value={data.employeePIN}
							onChange={onChange}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top"> Employee PIN</label>
					</div>
					<div className="e-float-input e-control-wrapper">
						<input
							id="employeeFirstName"
							name="EmployeeFirstName"
							type="text"
							value={data.employeeFirstName}
							onChange={onChange}
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
							value={data.employeeLastName}
							onChange={onChange}
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
							value={data.employeeDepartment}
							onChange={onChange}
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
							value={data.employeePosition}
							onChange={onChange}
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
							value={data.employeeEmail}
							onChange={onChange}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top">Employee Email</label>
					</div>
					{data.isAdd && (
						<div className="e-float-input e-control-wrapper">
							<input
								id="employeePassword"
								name="EmployeePassword"
								type="text"
								value={data.employeePassword}
								onChange={onChange}
							/>
							<span className="e-float-line" />
							<label className="e-float-text e-label-top">
								Employee Password
							</label>
						</div>
					)}
				</div>
			</div>
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
