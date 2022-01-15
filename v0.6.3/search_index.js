var documenterSearchIndex = {"docs":
[{"location":"api/#API/Reference","page":"API/Reference","title":"API/Reference","text":"","category":"section"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"","category":"page"},{"location":"api/#Samplers","page":"API/Reference","title":"Samplers","text":"","category":"section"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"NestedModel\nNested","category":"page"},{"location":"api/#NestedSamplers.NestedModel","page":"API/Reference","title":"NestedSamplers.NestedModel","text":"NestedModel(loglike, prior_transform)\nNestedModel(loglike, priors::AbstractVector{<:Distribution})\n\nloglike must be callable with a signature loglike(::AbstractVector) where the length of the vector must match the number of parameters in your model.\n\nprior_transform must be a callable with a signature prior_transform(::AbstractVector) that returns the transformation from the unit-cube to parameter space. This is effectively the quantile or ppf of a statistical distribution. For convenience, if a vector of Distribution is provided (as a set of priors), a transformation function will automatically be constructed using Distributions.quantile.\n\nNote: loglike is the only function used for likelihood calculations. This means if you want your priors to be used for the likelihood calculations they must be manually included in the loglike function.\n\n\n\n\n\n","category":"type"},{"location":"api/#NestedSamplers.Nested","page":"API/Reference","title":"NestedSamplers.Nested","text":"Nested(ndims, nactive;\n    bounds=Bounds.MultiEllipsoid,\n    proposal=:auto,\n    enlarge=1.25,\n    update_interval=default_update_interval(proposal, ndims),\n    min_ncall=2nactive,\n    min_eff=0.10)\n\nStatic nested sampler with nactive active points and ndims parameters.\n\nndims is equivalent to the number of parameters to fit, which defines the dimensionality of the prior volume used in evidence sampling. nactive is the number of live or active points in the prior volume. This is a static sampler, so the number of live points will be constant for all of the sampling.\n\nBounds and Proposals\n\nbounds declares the Type of Bounds.AbstractBoundingSpace to use in the prior volume. The available bounds are described by Bounds. proposal declares the algorithm used for proposing new points. The available proposals are described in Proposals. If proposal is :auto, will choose the proposal based on ndims\n\nndims < 10 - Proposals.Uniform\n10 ≤ ndims ≤ 20 - Proposals.RWalk\nndims > 20 - Proposals.Slice\n\nThe original nested sampling algorithm is roughly equivalent to using Bounds.Ellipsoid with Proposals.Uniform. The MultiNest algorithm is roughly equivalent to Bounds.MultiEllipsoid with Proposals.Uniform. The PolyChord algorithm is roughly equivalent to using Proposals.RSlice.\n\nOther Parameters\n\nenlarge - When fitting the bounds to live points, they will be enlarged (in terms of volume) by this linear factor.\nupdate_interval - How often to refit the live points with the bounds as a fraction of nactive. By default this will be determined using default_update_interval for the given proposal\nProposals.Uniform - 1.5\nProposals.RWalk and Proposals.RStagger - 0.15 * walks\nProposals.Slice - 0.9 * ndims * slices\nProposals.RSlice - 2 * slices\nmin_ncall - The minimum number of iterations before trying to fit the first bound\nmin_eff - The maximum efficiency before trying to fit the first bound\n\n\n\n\n\n","category":"type"},{"location":"api/#Convergence","page":"API/Reference","title":"Convergence","text":"","category":"section"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"There are a few convergence criteria available, by default the dlogz criterion will be used.","category":"page"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"dlogz=0.5 sample until the fraction of the remaining evidence is below the given value (more info).\nmaxiter=Inf stop after the given number of iterations\nmaxcall=Inf stop after the given number of  log-likelihood function calls\nmaxlogl=Inf stop after reaching the target log-likelihood","category":"page"},{"location":"api/#Bounds","page":"API/Reference","title":"Bounds","text":"","category":"section"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"Bounds\nBounds.NoBounds\nBounds.Ellipsoid\nBounds.MultiEllipsoid","category":"page"},{"location":"api/#NestedSamplers.Bounds","page":"API/Reference","title":"NestedSamplers.Bounds","text":"NestedSamplers.Bounds\n\nThis module contains the different algorithms for bounding the prior volume.\n\nThe available implementations are\n\nBounds.NoBounds - no bounds on the prior volume (equivalent to a unit cube)\nBounds.Ellipsoid - bound using a single ellipsoid\nBounds.MultiEllipsoid - bound using multiple ellipsoids in an optimal cluster\n\n\n\n\n\n","category":"module"},{"location":"api/#NestedSamplers.Bounds.NoBounds","page":"API/Reference","title":"NestedSamplers.Bounds.NoBounds","text":"Bounds.NoBounds([T=Float64], N)\n\nUnbounded prior volume; equivalent to the unit cube in N dimensions.\n\n\n\n\n\n","category":"type"},{"location":"api/#NestedSamplers.Bounds.Ellipsoid","page":"API/Reference","title":"NestedSamplers.Bounds.Ellipsoid","text":"Bounds.Ellipsoid([T=Float64], N)\nBounds.Ellipsoid(center::AbstractVector, A::AbstractMatrix)\n\nAn N-dimensional ellipsoid defined by\n\n(x - center)^T A (x - center) = 1\n\nwhere size(center) == (N,) and size(A) == (N,N).\n\n\n\n\n\n","category":"type"},{"location":"api/#NestedSamplers.Bounds.MultiEllipsoid","page":"API/Reference","title":"NestedSamplers.Bounds.MultiEllipsoid","text":"Bounds.MultiEllipsoid([T=Float64], ndims)\nBounds.MultiEllipsoid(::AbstractVector{Ellipsoid})\n\nUse multiple Ellipsoids in an optimal clustering to bound prior space. For more details about the bounding algorithm, see the extended help (??Bounds.MultiEllipsoid)\n\n\n\n\n\n","category":"type"},{"location":"api/#Proposals","page":"API/Reference","title":"Proposals","text":"","category":"section"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"Proposals\nProposals.Uniform\nProposals.RWalk\nProposals.RStagger\nProposals.Slice\nProposals.RSlice","category":"page"},{"location":"api/#NestedSamplers.Proposals","page":"API/Reference","title":"NestedSamplers.Proposals","text":"NestedSamplers.Proposals\n\nThis module contains the different algorithms for proposing new points within a bounding volume in unit space.\n\nThe available implementations are\n\nProposals.Uniform - samples uniformly within the bounding volume\nProposals.RWalk - random walks to a new point given an existing one\nProposals.RStagger - random staggering away to a new point given an existing one\nProposals.Slice - slicing away to a new point given an existing one\nProposals.RSlice - random slicing away to a new point given an existing one\n\n\n\n\n\n","category":"module"},{"location":"api/#NestedSamplers.Proposals.Uniform","page":"API/Reference","title":"NestedSamplers.Proposals.Uniform","text":"Proposals.Uniform()\n\nPropose a new live point by uniformly sampling within the bounding volume.\n\n\n\n\n\n","category":"type"},{"location":"api/#NestedSamplers.Proposals.RWalk","page":"API/Reference","title":"NestedSamplers.Proposals.RWalk","text":"Proposals.RWalk(;ratio=0.5, walks=25, scale=1)\n\nPropose a new live point by random walking away from an existing live point.\n\nParameters\n\nratio is the target acceptance ratio\nwalks is the minimum number of steps to take\nscale is the proposal distribution scale, which will update between proposals.\n\n\n\n\n\n","category":"type"},{"location":"api/#NestedSamplers.Proposals.RStagger","page":"API/Reference","title":"NestedSamplers.Proposals.RStagger","text":"Proposals.RStagger(;ratio=0.5, walks=25, scale=1)\n\nPropose a new live point by random staggering away from an existing live point.  This differs from the random walk proposal in that the step size here is exponentially adjusted to reach a target acceptance rate during each proposal, in addition to between proposals.\n\nParameters\n\nratio is the target acceptance ratio\nwalks is the minimum number of steps to take\nscale is the proposal distribution scale, which will update between proposals.\n\n\n\n\n\n","category":"type"},{"location":"api/#NestedSamplers.Proposals.Slice","page":"API/Reference","title":"NestedSamplers.Proposals.Slice","text":"Proposals.Slice(;slices=5, scale=1)\n\nPropose a new live point by a series of random slices away from an existing live point. This is a standard Gibbs-like implementation where a single multivariate slice is a combination of slices univariate slices through each axis.\n\nParameters\n\nslices is the minimum number of slices\nscale is the proposal distribution scale, which will update between proposals.\n\n\n\n\n\n","category":"type"},{"location":"api/#NestedSamplers.Proposals.RSlice","page":"API/Reference","title":"NestedSamplers.Proposals.RSlice","text":"Proposals.RSlice(;slices=5, scale=1)\n\nPropose a new live point by a series of random slices away from an existing live point. This is a standard random implementation where each slice is along a random direction based on the provided axes.\n\nParameters\n\nslices is the minimum number of slices\nscale is the proposal distribution scale, which will update between proposals.\n\n\n\n\n\n","category":"type"},{"location":"api/#Models","page":"API/Reference","title":"Models","text":"","category":"section"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"Models\nModels.GaussianShells\nModels.CorrelatedGaussian","category":"page"},{"location":"api/#NestedSamplers.Models","page":"API/Reference","title":"NestedSamplers.Models","text":"This module contains various statistical models in the form of NestedModels. These models can be used for examples and for testing.\n\nModels.GaussianShells\nModels.CorrelatedGaussian\n\n\n\n\n\n","category":"module"},{"location":"api/#NestedSamplers.Models.GaussianShells","page":"API/Reference","title":"NestedSamplers.Models.GaussianShells","text":"Models.GaussianShells()\n\n2-D Gaussian shells centered at [-3.5, 0] and [3.5, 0] with a radius of 2 and a shell width of 0.1\n\nExamples\n\njulia> model, lnZ = Models.GaussianShells();\n\njulia> lnZ\n-1.75\n\n\n\n\n\n","category":"function"},{"location":"api/#NestedSamplers.Models.CorrelatedGaussian","page":"API/Reference","title":"NestedSamplers.Models.CorrelatedGaussian","text":"Models.CorrelatedGaussian(ndims)\n\nCreates a highly-correlated Gaussian with the given dimensionality.\n\nmathbftheta sim mathcalNleft(2mathbf1 mathbfIright)\n\nSigma_ij = begincases 1 quad i=j  095 quad ineq j endcases\n\nmathcalL(mathbftheta) = mathcalNleft(mathbftheta  mathbf0 mathbfSigma right)\n\nthe analytical evidence of the model is\n\nZ = mathcalNleft(2mathbf1  mathbf0 mathbfSigma + mathbfI right)\n\nExamples\n\njulia> model, lnZ = Models.CorrelatedGaussian(10);\n\njulia> lnZ\n-12.482738597926607\n\n\n\n\n\n","category":"function"},{"location":"examples/shells/#Gaussian-Shells","page":"Gaussian Shells","title":"Gaussian Shells","text":"","category":"section"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"This example will explore the classic Gaussian shells model using Models.GaussianShells.","category":"page"},{"location":"examples/shells/#Setup","page":"Gaussian Shells","title":"Setup","text":"","category":"section"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"For this example, you'll need to add the following packages","category":"page"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"julia>]add Distributions MCMCChains Measurements NestedSamplers StatsBase StatsPlots","category":"page"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"using AbstractMCMC\nusing Random\nAbstractMCMC.setprogress!(false)\nRandom.seed!(8452)","category":"page"},{"location":"examples/shells/#Define-model","page":"Gaussian Shells","title":"Define model","text":"","category":"section"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"using NestedSamplers\n\nmodel, logz = Models.GaussianShells()\nnothing; # hide","category":"page"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"let's take a look at a couple of parameters to see what the likelihood surface looks like","category":"page"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"using StatsPlots\n\nx = range(-6, 6, length=1000)\ny = range(-6, 6, length=1000)\nlogf = [model.loglike([xi, yi]) for yi in y, xi in x]\nheatmap(\n    x, y, exp.(logf),\n    aspect_ratio=1,\n    xlims=extrema(x),\n    ylims=extrema(y),\n    xlabel=\"x\",\n    ylabel=\"y\",\n    size=(400, 400)\n)","category":"page"},{"location":"examples/shells/#Sample","page":"Gaussian Shells","title":"Sample","text":"","category":"section"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"using MCMCChains\nusing StatsBase\n# using multi-ellipsoid for bounds\n# using default rejection sampler for proposals\nsampler = Nested(2, 1000)\nchain, state = sample(model, sampler; dlogz=0.05, param_names=[\"x\", \"y\"])\n# resample chain using statistical weights\nchain_resampled = sample(chain, Weights(vec(chain[:weights])), length(chain));\nnothing # hide","category":"page"},{"location":"examples/shells/#Results","page":"Gaussian Shells","title":"Results","text":"","category":"section"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"chain_resampled","category":"page"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"marginalkde(chain[:x], chain[:y])","category":"page"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"density(chain_resampled)\nvline!([-5.5, -1.5, 1.5, 5.5], c=:black, ls=:dash, sp=1)\nvline!([-2, 2], c=:black, ls=:dash, sp=2)","category":"page"},{"location":"examples/shells/","page":"Gaussian Shells","title":"Gaussian Shells","text":"using Measurements\nlogz_est = state.logz ± state.logzerr\ndiff = logz_est - logz\nprint(\"logz: \", logz, \"\\nestimate: \", logz_est, \"\\ndiff: \", diff)","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = NestedSamplers","category":"page"},{"location":"#NestedSamplers.jl","page":"Home","title":"NestedSamplers.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: GitHub) (Image: Build Status) (Image: PkgEval) (Image: Coverage)","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: DOI)","category":"page"},{"location":"","page":"Home","title":"Home","text":"A Julian implementation of single- and multi-ellipsoidal nested sampling algorithms using the AbstractMCMC interface.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package was heavily influenced by nestle, dynesty, and NestedSampling.jl.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To use the nested samplers first install this library","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> ]add NestedSamplers","category":"page"},{"location":"#Usage","page":"Home","title":"Usage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The samplers are built using the AbstractMCMC interface. To use it, we need to create a NestedModel.","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Random\nusing AbstractMCMC\nAbstractMCMC.setprogress!(false)\nRandom.seed!(8452);\nnothing # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Distributions\nusing LinearAlgebra\nusing NestedSamplers\nusing StatsFuns: logaddexp\n\n# Gaussian mixture model\nσ = 0.1\nμ1 = ones(2)\nμ2 = -ones(2)\ninv_σ = diagm(0 => fill(1 / σ^2, 2))\n\nfunction logl(x)\n    dx1 = x .- μ1\n    dx2 = x .- μ2\n    f1 = -dx1' * (inv_σ * dx1) / 2\n    f2 = -dx2' * (inv_σ * dx2) / 2\n    return logaddexp(f1, f2)\nend\npriors = [\n    Uniform(-5, 5),\n    Uniform(-5, 5)\n]\n# or equivalently\nprior_transform(X) = 10 .* X .- 5\n# create the model\n# or model = NestedModel(logl, prior_transform)\nmodel = NestedModel(logl, priors);\nnothing # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"now, we set up our sampling using StatsBase.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Important:  the state of the sampler is returned in addition to the chain by sample.","category":"page"},{"location":"","page":"Home","title":"Home","text":"using StatsBase: sample, Weights\n\n# create our sampler\n# 2 parameters, 1000 active points, multi-ellipsoid. See docstring\nspl = Nested(2, 1000)\n# by default, uses dlogz for convergence. Set the keyword args here\n# currently Chains and Array are support chain_types\nchain, state = sample(model, spl; dlogz=0.2, param_names=[\"x\", \"y\"])\n# optionally resample the chain using the weights\nchain_res = sample(chain, Weights(vec(chain[\"weights\"])), length(chain));","category":"page"},{"location":"","page":"Home","title":"Home","text":"let's take a look at the resampled posteriors","category":"page"},{"location":"","page":"Home","title":"Home","text":"using StatsPlots\ndensity(chain_res)\n# analytical posterior maxima\nvline!([-1, 1], c=:black, ls=:dash, subplot=1)\nvline!([-1, 1], c=:black, ls=:dash, subplot=2)","category":"page"},{"location":"","page":"Home","title":"Home","text":"and compare our estimate of the Bayesian (log-)evidence to the analytical value","category":"page"},{"location":"","page":"Home","title":"Home","text":"analytic_logz = log(4π * σ^2 / 100)\n# within 2-sigma\n@assert isapprox(analytic_logz, state.logz, atol=2state.logzerr)","category":"page"},{"location":"#Contributing","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Primary Author: Miles Lucas (@mileslucas)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Contributions are always welcome! Take a look at the issues for ideas of open problems! To discuss ideas or plan contributions, open a discussion.","category":"page"},{"location":"examples/correlated/#Correlated-Gaussian","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"","category":"section"},{"location":"examples/correlated/","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"This example will explore a highly-correlated Gaussian using Models.CorrelatedGaussian. This model uses a conjuage Gaussian prior, see the docstring for the mathematical definition.","category":"page"},{"location":"examples/correlated/#Setup","page":"Correlated Gaussian","title":"Setup","text":"","category":"section"},{"location":"examples/correlated/","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"For this example, you'll need to add the following packages","category":"page"},{"location":"examples/correlated/","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"julia>]add Distributions MCMCChains Measurements NestedSamplers StatsBase StatsPlots","category":"page"},{"location":"examples/correlated/","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"using AbstractMCMC\nusing Random\nAbstractMCMC.setprogress!(false)\nRandom.seed!(8452)","category":"page"},{"location":"examples/correlated/#Define-model","page":"Correlated Gaussian","title":"Define model","text":"","category":"section"},{"location":"examples/correlated/","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"using NestedSamplers\n\n# set up a 4-dimensional Gaussian\nD = 4\nmodel, logz = Models.CorrelatedGaussian(D)\nnothing; # hide","category":"page"},{"location":"examples/correlated/","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"let's take a look at a couple of parameters to see what the likelihood surface looks like","category":"page"},{"location":"examples/correlated/","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"using StatsPlots\n\nθ1 = range(-1, 1, length=1000)\nθ2 = range(-1, 1, length=1000)\nlogf = [model.loglike([t1, t2, 0, 0]) for t2 in θ2, t1 in θ1]\nheatmap(\n    θ1, θ2, exp.(logf),\n    aspect_ratio=1,\n    xlims=extrema(θ1),\n    ylims=extrema(θ2),\n    xlabel=\"θ1\",\n    ylabel=\"θ2\"\n)","category":"page"},{"location":"examples/correlated/#Sample","page":"Correlated Gaussian","title":"Sample","text":"","category":"section"},{"location":"examples/correlated/","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"using MCMCChains\nusing StatsBase\n# using single Ellipsoid for bounds\n# using Gibbs-style slicing for proposing new points\nsampler = Nested(D, 50D; \n    bounds=Bounds.Ellipsoid,\n    proposal=Proposals.Slice()\n)\nnames = [\"θ_$i\" for i in 1:D]\nchain, state = sample(model, sampler; dlogz=0.01, param_names=names)\n# resample chain using statistical weights\nchain_resampled = sample(chain, Weights(vec(chain[:weights])), length(chain));\nnothing # hide","category":"page"},{"location":"examples/correlated/#Results","page":"Correlated Gaussian","title":"Results","text":"","category":"section"},{"location":"examples/correlated/","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"chain_resampled","category":"page"},{"location":"examples/correlated/","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"corner(chain_resampled)","category":"page"},{"location":"examples/correlated/","page":"Correlated Gaussian","title":"Correlated Gaussian","text":"using Measurements\nlogz_est = state.logz ± state.logzerr\ndiff = logz_est - logz\nprint(\"logz: \", logz, \"\\nestimate: \", logz_est, \"\\ndiff: \", diff)","category":"page"}]
}
