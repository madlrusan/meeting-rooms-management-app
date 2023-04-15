import { useState } from "react";
import { useNavigate } from "react-router";
import {
	ButtonsContainer,
	CancelButton,
	SubmitButton,
} from "./DialogForm.components";
import { AddRoom, UpdateRoom } from "../../../../api/rooms";
import { useMutation } from "react-query";
import React from "react";

export const DialogForm = (props: any) => {
	const [val, setVal] = useState(props);
	const navigate = useNavigate();
	const handleSubmit = (event: any) => {
		if (val.isAdd) {
			onAdd.mutate(val);
		} else {
			onEdit.mutate(val);
		}
		event.preventDefault();
	};
	const onEdit = useMutation(UpdateRoom, {
		onSuccess: (data) => {
			console.log("successful updated", data);
			navigate("/rooms");
		},
	});
	const onAdd = useMutation(AddRoom, {
		onSuccess: (data) => {
			console.log("successful added", data);
			navigate("/rooms");
		},
	});
	return (
		<div>
			<div className="form-row">
				<div className="form-group col-md-6">
					<div className="e-float-input e-control-wrapper">
						<input
							id="roomName"
							name="roomName"
							type="text"
							value={val.roomName}
							onChange={(event) =>
								setVal({ ...val, roomName: event.target.value })
							}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top"> Room Name: </label>
					</div>
					<div className="e-float-input e-control-wrapper">
						<input
							id="roomType"
							name="roomType"
							type="text"
							value={val.roomType}
							onChange={(event) =>
								setVal({ ...val, roomType: event.target.value })
							}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top"> Room Type: </label>
					</div>
					<div className="e-float-input e-control-wrapper">
						<input
							id="roomCapacity"
							name="roomCapacity"
							type="number"
							value={val.roomCapacity}
							onChange={(event) =>
								setVal({ ...val, roomCapacity: event.target.value })
							}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top">Room Capacity: </label>
					</div>
					<div className="e-float-input e-control-wrapper">
						<input
							id="roomLocation"
							name="roomLocation"
							type="text"
							value={val.roomLocation}
							onChange={(event) =>
								setVal({ ...val, roomLocation: event.target.value })
							}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top">Room Location: </label>
					</div>
					<div className="e-float-input e-control-wrapper">
						<input
							id="roomEmail"
							name="roomEmail"
							type="text"
							value={val.roomEmail}
							onChange={(event) =>
								setVal({ ...val, roomEmail: event.target.value })
							}
						/>
						<span className="e-float-line" />
						<label className="e-float-text e-label-top">Room Email:</label>
					</div>
					{val.isAdd && (
						<div className="e-float-input e-control-wrapper">
							<input
								id="roomPassword"
								name="roomPassword"
								type="text"
								value={val.roomPassword}
								onChange={(event) =>
									setVal({ ...val, roomPassword: event.target.value })
								}
							/>
							<span className="e-float-line" />
							<label className="e-float-text e-label-top">Room Password</label>
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
		return <div>Edit {args.roomName}</div>;
	} else if (args.isAdd) {
		return <div>Add a new room</div>;
	}
};

export const FTemplate = (args: any) => {
	return <div>{""}</div>;
};
