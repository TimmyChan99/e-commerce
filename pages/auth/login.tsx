import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type Inputs = {
	email: string;
	password: string;
};

const Login = () => {
	const { handleSubmit, register, formState: { errors } } = useForm<Inputs>();
	const { data: session } = useSession();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { redirect } = router.query;

	useEffect(() => {
		if (session?.user) {
			router.push(redirect ? redirect.toString() : '/');
		}
	}, [router, session, redirect]);

	const onSubmit = async (data: Inputs) => {
		try {
			setLoading(true);
			await signIn('credentials', {
				redirect: false,
				email: data.email,
				password: data.password,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout title="Login">
			<form
				className="mx-auto max-w-screen-md"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="mb-4 text-xl">Login</h1>
				<div className="mb-4">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						{...register('email', {
							required: 'Please enter email',
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
								message: 'Please enter valid email',
							},
						})}
						className="w-full"
						id="email"
						autoFocus
					></input>
					{errors.email && (
						<div className="text-red-500">{errors.email.message}</div>
					)}
				</div>
				<div className="mb-4">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						{...register('password', {
							required: 'Please enter password',
							minLength: { value: 6, message: 'password is more than 5 chars' },
						})}
						className="w-full"
						id="password"
						autoFocus
					></input>
					{errors.password && (
						<div className="text-red-500 ">{errors.password.message}</div>
					)}
				</div>
				<div className="mb-4 ">
					<button className="primary-button">{loading ? 'Login In...' : 'Login'}</button>
				</div>
				<div className="mb-4 ">
					Don&apos;t have an account? &nbsp;
					<Link href={`/register?redirect=`}>Register</Link>
				</div>
			</form>
		</Layout>
	);
};

export default Login;
